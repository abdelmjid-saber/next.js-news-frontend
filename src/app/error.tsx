"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  return (
    <div className="container max-w-md min-h-[93vh] flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{error.message || "Something went wrong!"}</CardTitle>
        </CardHeader>
        <CardContent>
            <Button className="w-full" onClick={() => reset()}>
              Try again
            </Button>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button variant="link">
            <Link href="/">Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Error;
