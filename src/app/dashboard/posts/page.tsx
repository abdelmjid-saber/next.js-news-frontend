import { PostsTable } from "@/components/posts-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="container space-y-8 mt-10">
            <div className="flex items-center justify-between">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Posts
                </h2>
                <Button>
                    <Link href="/dashboard/posts/create">Add New</Link>
                </Button>
            </div>
            <section>
                <PostsTable />
            </section>
        </div>
    )
}