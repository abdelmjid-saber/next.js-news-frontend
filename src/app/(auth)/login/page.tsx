import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Card className="w-96">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Button variant="link">
                        <Link href="/register">Create account</Link>
                    </Button>
                    <Button variant="link">
                        <Link href="/forgot-password">Forgot password</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
