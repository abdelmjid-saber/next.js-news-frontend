import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import Image from "next/image";
import { format } from 'date-fns';
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from 'next/navigation'

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;

    const post = await getPost(slug);
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${post.featured_image}`, ...previousImages],
        },
    };
}

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

const getPost = async (slug: string): Promise<Post> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/post/${slug}`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const post = await data.json();

    return post;
};

export default async function Page({
    params: { slug },
}: {
    params: {
        slug: string;
    };
}) {
    const post = await getPost(slug);

    if(!post) {
        redirect('/')
    }
    const formattedDate = format(new Date(post.created_at), 'MMMM dd, yyyy');

    return (
        <>
            <div className="container space-y-16">
                <section className="mt-10">
                    <div className="max-w-[1030px] mx-auto px-4 sm:px-8 xl:px-0">
                        <div className="mx-auto">
                            <h1 className="font-bold text-2xl sm:text-4xl lg:text-custom-2 text-dark mb-5">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 mt-7.5">
                                <Link href={`category/${post.category.slug}`} className={badgeVariants({ variant: "default" })}>{post.category.name}</Link>

                                {post.tags.map(tag => (
                                    <Link href={`tag/${tag.slug}`} className={badgeVariants({ variant: "default" })} key={tag.id}>{tag.name}</Link>
                                ))}
                            </div>
                            <div className="text-sm font-medium leading-none mt-4">
                                <p>Last updated on  {formattedDate} by {post.user.name}</p>
                            </div>
                        </div>
                        <Image
                            src={process.env.NEXT_PUBLIC_BACKEND_API_URL + post.featured_image}
                            alt={post.title}
                            className="mt-6 mb-11 object-cover rounded-xl"
                            width={1030}
                            height={550}
                            quality={100}
                        />
                        <div className="max-w-[770px] mx-auto">
                            <div className="prose dark:prose-invert prose-img:rounded-xl prose-a:font-semibold prose-a:hover-text-primary/80 max-w-none">
                                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                                <div className="border-t border-gray-3 pt-10 mt-12.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-9">
                                        <div className="max-w-[133px] w-full h-[133px] rounded-full flex items-center justify-center border border-gray-3">
                                            <div className="max-w-[97px] w-full h-[97px] shadow-img rounded-full overflow-hidden">
                                                <Image
                                                    src={post.user.profile_photo_url}
                                                    alt={post.user.username}
                                                    className="mt-6 mb-11 object-cover rounded-xl"
                                                    width={97}
                                                    height={97}
                                                    quality={100}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold tracking-tight mb-3">
                                                {post.user.name}
                                            </h4>
                                            <p>{post.user.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
