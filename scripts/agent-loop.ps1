param(
  [int]$MaxCycles = 1,
  [int]$MaxFixAttempts = 1,
  [string]$TaskId,
  [ValidateSet("acceptEdits", "auto", "dontAsk", "manual", "plan")]
  [string]$ClaudePermissionMode = "acceptEdits",
  [decimal]$ClaudeMaxBudgetUsd = 2.00,
  [switch]$RunAudit,
  [switch]$AutoCommit,
  [switch]$AutoPush,
  [switch]$AllowDirtyStart,
  [switch]$DryRun,
  [switch]$DebugDiscovery
)

$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$StateDir = Join-Path $ProjectRoot ".agent-loop"
$LogDir = Join-Path $StateDir "logs"
$LockPath = Join-Path $StateDir "lock"
$StatePath = Join-Path $StateDir "state.json"

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
Set-Location $ProjectRoot

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Invoke-LoggedCommand {
  param(
    [string]$Name,
    [string[]]$Arguments,
    [string]$LogPath
  )

  Write-Step "$Name $($Arguments -join ' ')"
  & $Name @Arguments 2>&1 | Tee-Object -FilePath $LogPath
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE. See $LogPath"
  }
}

function Get-LoopState {
  if (Test-Path $StatePath) {
    return Get-Content $StatePath -Raw | ConvertFrom-Json
  }

  return [pscustomobject]@{
    completedTasks = @()
    lastTask = $null
    lastRunAt = $null
  }
}

function Save-LoopState {
  param([object]$State)
  $State | ConvertTo-Json -Depth 8 | Set-Content -Path $StatePath -Encoding UTF8
}

function Convert-ToPlainText {
  param([string]$Value)

  if (-not $Value) {
    return ""
  }

  $Normalized = $Value.Normalize([Text.NormalizationForm]::FormD)
  return [Text.RegularExpressions.Regex]::Replace($Normalized, "\p{Mn}", "")
}

function Get-NextTask {
  param(
    [string[]]$CompletedTasks,
    [string]$RequestedTaskId
  )

  $BacklogPath = Join-Path $ProjectRoot "docs\backlog.md"
  $TasksDir = Join-Path $ProjectRoot "docs\tasks"

  if (-not (Test-Path $BacklogPath)) {
    throw "Backlog not found: $BacklogPath"
  }

  $Lines = Get-Content $BacklogPath
  $Headings = @()

  for ($i = 0; $i -lt $Lines.Count; $i++) {
    if ($Lines[$i] -match "^### (TASK-\d+)\b") {
      $Headings += [pscustomobject]@{
        Id = $Matches[1]
        Start = $i
      }
    }
  }

  if ($DebugDiscovery) {
    Write-Step "Discovery: found $($Headings.Count) task heading(s)"
  }

  for ($h = 0; $h -lt $Headings.Count; $h++) {
    $TaskId = $Headings[$h].Id
    if ($RequestedTaskId -and $TaskId -ne $RequestedTaskId.ToUpperInvariant()) {
      if ($DebugDiscovery) {
        Write-Host "Skipping $TaskId`: requested task is $($RequestedTaskId.ToUpperInvariant())"
      }
      continue
    }

    if ($CompletedTasks -contains $TaskId) {
      if ($DebugDiscovery) {
        Write-Host "Skipping $TaskId`: already completed in .agent-loop/state.json"
      }
      continue
    }

    $Start = $Headings[$h].Start
    $End = if ($h + 1 -lt $Headings.Count) { $Headings[$h + 1].Start - 1 } else { $Lines.Count - 1 }
    $Block = ($Lines[$Start..$End] -join "`n")

    $StatusLine = ($Block -split "`n" | Where-Object { $_ -match "^\s*-\s*Status:" } | Select-Object -First 1)
    $StatusText = (Convert-ToPlainText $StatusLine).ToLowerInvariant()

    $Ready =
      $StatusText.Contains("proxima tarefa recomendada") -or
      $StatusText.Contains("pronta para claude") -or
      $StatusText.Contains("pendente")

    $Done =
      $StatusText.Contains("concluida") -or
      $StatusText.Contains("cancelada") -or
      $StatusText.Contains("bloqueada")

    if ($DebugDiscovery) {
      Write-Host "Checking $TaskId"
      Write-Host "  Status line: $StatusLine"
      Write-Host "  Ready: $Ready"
      Write-Host "  Done: $Done"
    }

    if (-not $RequestedTaskId -and (-not $Ready -or $Done)) {
      continue
    }

    $SpecPath = $null
    if ($Block -match 'Especifica[cç][aã]o:\s*`([^`]+)`') {
      $SpecPath = Join-Path $ProjectRoot $Matches[1]
    } else {
      $Spec = Get-ChildItem -Path $TasksDir -Filter "$($TaskId.ToLower())*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($Spec) {
        $SpecPath = $Spec.FullName
      }
    }

    if ($SpecPath -and (Test-Path $SpecPath)) {
      if ($DebugDiscovery) {
        Write-Host "  Spec: $SpecPath"
      }
      return [pscustomobject]@{
        Id = $TaskId
        SpecPath = (Resolve-Path $SpecPath).Path
      }
    } elseif ($DebugDiscovery) {
      Write-Host "  Spec not found for $TaskId"
    }
  }

  return $null
}

function Assert-CleanStart {
  if ($AllowDirtyStart) {
    return
  }

  $Status = git status --porcelain
  if ($LASTEXITCODE -ne 0) {
    throw "Could not read git status."
  }

  if ($Status) {
    throw "Working tree is dirty. Commit/stash current changes or run with -AllowDirtyStart."
  }
}

function Invoke-ClaudeTask {
  param(
    [object]$Task,
    [int]$Cycle,
    [int]$Attempt
  )

  $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $LogPath = Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-claude-attempt-$Attempt.log"
  $Prompt = @"
Voce e Claude Code trabalhando no repositorio C:\portifolio.

Leia AGENTS.md e CLAUDE.md antes de alterar arquivos.
Execute exatamente a tarefa abaixo, sem criar escopo extra:
$($Task.SpecPath)

Regras obrigatorias:
- Nao faca commit, push, deploy ou alteracao de secrets.
- Antes de editar, inspecione o contexto existente.
- Preserve mudancas que ja existirem no workspace.
- Rode as validacoes pedidas pela tarefa quando forem aplicaveis.
- Ao terminar, atualize docs/handoff.md com um bloco "Ultimo Handoff - $($Task.Id)".
- Se ficar bloqueado, registre o bloqueio em docs/handoff.md e pare.
"@

  Invoke-LoggedCommand `
    -Name "claude" `
    -Arguments @("--permission-mode", $ClaudePermissionMode, "--output-format", "text", "--max-budget-usd", "$ClaudeMaxBudgetUsd", "-p", $Prompt) `
    -LogPath $LogPath
}

function Invoke-ProjectValidation {
  param(
    [object]$Task,
    [int]$Cycle,
    [int]$Attempt
  )

  $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  Invoke-LoggedCommand -Name "npm.cmd" -Arguments @("run", "lint") -LogPath (Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-lint.log")
  Invoke-LoggedCommand -Name "npm.cmd" -Arguments @("run", "build") -LogPath (Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-build.log")

  if ($RunAudit) {
    Invoke-LoggedCommand -Name "npm.cmd" -Arguments @("audit", "--omit=dev") -LogPath (Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-audit.log")
  }
}

function Invoke-CodexReview {
  param(
    [object]$Task,
    [int]$Cycle,
    [int]$Attempt
  )

  $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $ReviewPath = Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-codex-review-attempt-$Attempt.md"
  $Prompt = @"
Voce e ChatGPT/Codex no papel de orquestrador e revisor tecnico deste repositorio.

Revise a tarefa $($Task.Id) usando:
- AGENTS.md
- CLAUDE.md
- $($Task.SpecPath)
- docs/handoff.md
- docs/backlog.md
- git diff e git status
- logs em .agent-loop/logs quando forem uteis

Responda em portugues.
A primeira linha deve ser exatamente uma destas:
AGENT_REVIEW: APPROVED
AGENT_REVIEW: CHANGES_REQUESTED
AGENT_REVIEW: BLOCKED

Depois liste achados objetivos, arquivos relevantes, riscos e proximos passos.
Nao altere arquivos nesta revisao.
"@

  Invoke-LoggedCommand `
    -Name "codex" `
    -Arguments @("exec", "-C", $ProjectRoot, "-s", "read-only", "-a", "never", "-o", $ReviewPath, $Prompt) `
    -LogPath (Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-codex-review-cli.log")

  if (-not (Test-Path $ReviewPath)) {
    throw "Codex review file was not created: $ReviewPath"
  }

  return [pscustomobject]@{
    Path = $ReviewPath
    Text = Get-Content $ReviewPath -Raw
  }
}

function Invoke-ClaudeFix {
  param(
    [object]$Task,
    [string]$ReviewPath,
    [int]$Attempt
  )

  $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $LogPath = Join-Path $LogDir "$Timestamp-$($Task.Id.ToLower())-claude-fix-$Attempt.log"
  $Prompt = @"
Voce e Claude Code trabalhando no repositorio C:\portifolio.

A revisao do ChatGPT/Codex pediu correcao para $($Task.Id).
Leia:
- $($Task.SpecPath)
- $ReviewPath
- docs/handoff.md

Corrija somente os pontos apontados pela revisao.
Nao faca commit, push, deploy ou alteracao de secrets.
Ao terminar, atualize docs/handoff.md com o que foi corrigido.
"@

  Invoke-LoggedCommand `
    -Name "claude" `
    -Arguments @("--permission-mode", $ClaudePermissionMode, "--output-format", "text", "--max-budget-usd", "$ClaudeMaxBudgetUsd", "-p", $Prompt) `
    -LogPath $LogPath
}

function Invoke-AutoGit {
  param([object]$Task)

  if (-not $AutoCommit) {
    return
  }

  $Status = git status --porcelain
  if (-not $Status) {
    Write-Step "No changes to commit for $($Task.Id)"
    return
  }

  Invoke-LoggedCommand -Name "git" -Arguments @("add", "-A") -LogPath (Join-Path $LogDir "$(Get-Date -Format 'yyyyMMdd-HHmmss')-$($Task.Id.ToLower())-git-add.log")
  Invoke-LoggedCommand -Name "git" -Arguments @("commit", "-m", "chore: conclui $($Task.Id.ToLower())") -LogPath (Join-Path $LogDir "$(Get-Date -Format 'yyyyMMdd-HHmmss')-$($Task.Id.ToLower())-git-commit.log")

  if ($AutoPush) {
    $Branch = git branch --show-current
    Invoke-LoggedCommand -Name "git" -Arguments @("push", "origin", $Branch) -LogPath (Join-Path $LogDir "$(Get-Date -Format 'yyyyMMdd-HHmmss')-$($Task.Id.ToLower())-git-push.log")
  }
}

if (Test-Path $LockPath) {
  throw "Agent loop is already running or lock was left behind: $LockPath"
}

Set-Content -Path $LockPath -Value "pid=$PID started=$(Get-Date -Format o)" -Encoding UTF8

try {
  Assert-CleanStart
  $State = Get-LoopState

  if ($DryRun) {
    $Task = Get-NextTask -CompletedTasks @($State.completedTasks) -RequestedTaskId $TaskId
    if ($Task) {
      Write-Step "Dry run: next task is $($Task.Id)"
      Write-Host "Spec: $($Task.SpecPath)"
    } else {
      Write-Step "Dry run: no ready task found in docs/backlog.md"
    }
    return
  }

  for ($Cycle = 1; $Cycle -le $MaxCycles; $Cycle++) {
    $Completed = @($State.completedTasks)
    $Task = Get-NextTask -CompletedTasks $Completed -RequestedTaskId $TaskId

    if (-not $Task) {
      Write-Step "No ready task found in docs/backlog.md"
      break
    }

    Write-Step "Cycle $Cycle/$MaxCycles`: starting $($Task.Id)"
    $State.lastTask = $Task.Id
    $State.lastRunAt = (Get-Date -Format o)
    Save-LoopState -State $State

    $Approved = $false
    $Attempt = 0

    while (-not $Approved -and $Attempt -le $MaxFixAttempts) {
      $Attempt++

      if ($Attempt -eq 1) {
        Invoke-ClaudeTask -Task $Task -Cycle $Cycle -Attempt $Attempt
      } else {
        Invoke-ClaudeFix -Task $Task -ReviewPath $Review.Path -Attempt $Attempt
      }

      Invoke-ProjectValidation -Task $Task -Cycle $Cycle -Attempt $Attempt
      $Review = Invoke-CodexReview -Task $Task -Cycle $Cycle -Attempt $Attempt

      if ($Review.Text -match "AGENT_REVIEW:\s*APPROVED") {
        $Approved = $true
        Write-Step "$($Task.Id) approved by Codex"
      } elseif ($Review.Text -match "AGENT_REVIEW:\s*BLOCKED") {
        throw "$($Task.Id) blocked by Codex review. See $($Review.Path)"
      } elseif ($Attempt -gt $MaxFixAttempts) {
        throw "$($Task.Id) still needs changes after $MaxFixAttempts fix attempt(s). See $($Review.Path)"
      } else {
        Write-Step "$($Task.Id) needs changes; sending review back to Claude"
      }
    }

    if ($Approved) {
      $State.completedTasks = @($State.completedTasks + $Task.Id | Select-Object -Unique)
      Save-LoopState -State $State
      Invoke-AutoGit -Task $Task
    }
  }
} finally {
  Remove-Item -Path $LockPath -Force -ErrorAction SilentlyContinue
}
