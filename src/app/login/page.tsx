import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginLink>
        <Button variant="outline">Login</Button>
      </LoginLink>
    </div>
  );
}
