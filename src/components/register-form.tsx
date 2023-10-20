"use client";

import { Input } from "@/components/ui/input";
import fetchClient from "@/lib/fetch-client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/register",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      signIn("credentials", credentials);
    } catch (error) {
      if (error instanceof Response) {
        setIsLoading(false);

        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(`[name="${errorKey}"]`) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error("An error has occurred during registration request");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" >
        <div className="grid gap-2" >
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div className="grid gap-2" >
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" type="text" />
        </div>
        <div className="grid gap-2" >
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password_confirmation">Password confirmation</Label>
          <Input id="password_confirmation" name="password_confirmation" type="password" />
        </div>

        <Button className="w-full" disabled={isLoading} >
          {
            isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Create account"
            )
          }
        </Button>
      </form>
    </>
  );
}
