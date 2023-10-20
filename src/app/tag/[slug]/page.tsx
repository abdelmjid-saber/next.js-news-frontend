'use client'

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton-card";

export default function Page({ params }: { params: { slug: string } }) {
    const [posts, setPosts] = useState([]);
    const [tag, setTag] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts/tag/${params.slug}?limit=16&page=${currentPage}`;
        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTag(data.tag);
                setPosts(data.posts.data);
                setLastPage(data.posts.last_page);
                setIsLoading(true)
            })
            .catch((error) => {
                throw new Error('Failed to fetch data')
            });
    }, [currentPage, params.slug]);

    return (
        <div className="container space-y-16">
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        {tag?.name}
                    </h2>
                </div>
                <div className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {isLoading ? (
                        posts ? (
                            posts.map((post, index) => (
                                <BlogCard key={index} post={post} />
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )
                    ) : (
                        Array.from({ length: 16 }, (_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    )}
                </div>
                <div className="flex items-center justify-between mt-8">
                    <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1 && (true)}>Previous</Button>
                    <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage == lastPage && (true)}>Next</Button>
                </div>
            </section>
        </div>
    )
}
