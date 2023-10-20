import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button variant="link">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
