import { BrutalButton } from "@/components/brand/brutal-button";
import { signOutAction } from "@/lib/auth/actions";

export function LogoutButton() {
  return (
    <form action={signOutAction}>
      <BrutalButton type="submit" variant="outline">
        Sair do admin
      </BrutalButton>
    </form>
  );
}
