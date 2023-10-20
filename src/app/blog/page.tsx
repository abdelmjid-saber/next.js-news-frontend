'use client'

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import Link from "next/link";

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts?limit=16&page=${currentPage}`;

        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.data);
                setLastPage(data.last_page);
                setIsLoading(true)
            })
            .catch((error) => {
                if (error instanceof Response) {

                    const response = error.json();

                    if (!response) {
                        throw error;
                    }

                    return Object.keys(error).map((errorKey) => {
                        const input = document.querySelector(`[name="${errorKey}"]`) as HTMLInputElement;
                        input.reportValidity();
                    });
                }

                throw new Error("Error fetching data from the API:", error);
            });
    }, [currentPage]);

    return (
        <div className="container space-y-16">
            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Blog
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
