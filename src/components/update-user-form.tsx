"use client";

import { Input } from "@/components/ui/input";
import fetchClient from "@/lib/fetch-client";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface UpdateUserFormProps {
  user?: User;
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/update",
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw response;
      }

      const user = await response.json();
      await update(user);
      
      setIsLoading(false);
      router.refresh();
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

      throw new Error("An error has occurred during update user request");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={user?.name}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          defaultValue={user?.email}
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
              "Update user"
            )
          }
        </Button>
    </form>
  );
}
