import Link from "next/link";
import { Button } from "./ui/button";
import { BlogCard } from "./ui/blog-card";

const getPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts?limit=8`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const posts = await data.json();

    return posts;
};

export default async function TheLatest() {
    const posts = await getPosts();

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    The latest
                </h2>
                <Button variant="link">
                    <Link href="/blog">View all</Link>
                </Button>
            </div>
            <div className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {posts.data ? (
                    posts.data.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))
                ) : (
                    <p className="col-span-6">No posts available.</p>
                )}
            </div>
        </section>
    )
}