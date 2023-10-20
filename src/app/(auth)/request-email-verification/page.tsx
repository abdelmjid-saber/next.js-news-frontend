import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import fetchServer from "@/lib/fetch-server";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email_verified_at) {
    redirect("/dashboard");
  }

  async function sendVerificationLink() {
    "use server";

    try {
      const response = await fetchServer({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/email/verification-notification",
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {

      throw new Error("Could not send email verification request", { cause: error });
    }
  }

  return (
    <>
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={sendVerificationLink}>
            <Button className="w-full">
              Send me a verification link
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
