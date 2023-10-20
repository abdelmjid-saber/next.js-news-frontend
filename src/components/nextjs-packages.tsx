import Link from "next/link";
import { Button } from "./ui/button";
import { BlogCard } from "./ui/blog-card";

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        username: string;
        bio: string;
        profile_photo_url: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
};

const getPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts/category/packages?limit=8`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const response = await data.json();
    const posts = response.posts.data;

    return posts;
};

export default async function NextjsPackages() {
    const posts = await getPosts();

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Next.js Packages
                </h2>
                <Button variant="link">
                    <Link href="/category/packages">View all</Link>
                </Button>
            </div>
            <div className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {posts ? (
                    posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))
                ) : (
                    <p className="col-span-6">No posts available.</p>
                )}
            </div>
        </section>
    )
}