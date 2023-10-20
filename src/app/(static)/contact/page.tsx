import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import fetchClient from "@/lib/fetch-client";
import Link from "next/link";

export default function Page() {
    return (
        <div className="container space-y-16">
            <section className="min-h-[80vh] flex items-center justify-center">
                <div className="max-w-[1030px] mx-auto px-4 sm:px-8 xl:px-0">
                    <Card className="w-[32rem]">
                        <CardHeader>
                            <CardTitle>Contact US</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    {/* <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" type="text" className="  " />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" name="subject" type="text" className="  " />
                                    </div> */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" name="message" placeholder="Type your message here." />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button className="w-full" disabled>Send Message</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    )
}
