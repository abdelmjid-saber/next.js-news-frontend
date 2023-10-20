"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(formData);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    setIsLoading(true);

    try {
      await signIn("credentials", { ...credentials, callbackUrl });
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <FormError error={error} />
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>

        <Button className="w-full" disabled={isLoading} >
          {
            isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )
          }
        </Button>
      </form>
    </>
  );
}

function FormError({ error }: { error: string | null }) {
  if (!error) return null;

  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: "Invalid credentials",
    Default: "Default Error Message",
  };

  return <p className="!mt-1 text-sm text-red-600">{errorMessages[error]}</p>;
}