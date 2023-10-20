"use client";

import { Input } from "@/components/ui/input";
import fetchClient from "@/lib/fetch-client";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/change-password",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Response) {
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

      throw new Error("An error has occurred during forgot password request");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password_confirmation">Password confirmation</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
        />
      </div>

      <Button disabled={isLoading} >
          {
            isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Change password"
            )
          }
        </Button>
    </form>
  );
}
