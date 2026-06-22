export type AuthUser = {
  id: string;
  email: string | null;
};

export type AdminCheckReason =
  | "ok"
  | "supabase_not_configured"
  | "admin_email_not_configured"
  | "not_authenticated"
  | "missing_user_email"
  | "not_allowed";

export type AdminCheckResult = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  email: string | null;
  reason: AdminCheckReason;
};

export type LoginActionState = {
  status: "idle" | "error";
  message: string;
};
