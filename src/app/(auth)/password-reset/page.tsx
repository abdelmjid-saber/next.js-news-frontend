import PasswordResetForm from "@/components/password-reset-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password reset</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <PasswordResetForm />
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
