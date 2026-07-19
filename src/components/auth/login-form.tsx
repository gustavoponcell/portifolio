"use client";

import { useActionState } from "react";

import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { signInWithPasswordAction } from "@/lib/auth/actions";
import type { LoginActionState } from "@/lib/auth/types";

const initialState: LoginActionState = {
  status: "idle",
  message: "",
};

type LoginFormProps = {
  disabled?: boolean;
};

export function LoginForm({ disabled = false }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    signInWithPasswordAction,
    initialState
  );

  return (
    <BrutalCard className="space-y-5">
      <div>
        <h2 className="text-2xl font-black">Entrar na área restrita</h2>
        <p className="mt-2 leading-7">
          Use o e-mail e a senha autorizados para gerenciar o portfólio. Esta
          tela não oferece cadastro público.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-[0.18em]" htmlFor="email">
            E-mail
          </label>
          <input
            className="brutal-border w-full bg-card px-4 py-3 text-base font-bold outline-none focus-visible:ring-4 focus-visible:ring-dev"
            disabled={disabled || pending}
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-black uppercase tracking-[0.18em]"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="brutal-border w-full bg-card px-4 py-3 text-base font-bold outline-none focus-visible:ring-4 focus-visible:ring-dev"
            disabled={disabled || pending}
            id="password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
          />
        </div>

        {state.status === "error" ? (
          <p
            className="brutal-border border-[#111111] bg-design px-4 py-3 font-bold ink-on-accent"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <BrutalButton disabled={disabled || pending} type="submit" variant="dev">
          {pending ? "Entrando..." : "Entrar na área restrita"}
        </BrutalButton>
      </form>
    </BrutalCard>
  );
}
