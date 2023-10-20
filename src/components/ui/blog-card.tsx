import Image from "next/image";
import Link from "next/link";

export function BlogCard({ post }: any) {
    if (!post) {
        return null;
    }

    return (
        <Link href={post?.slug} className="block py-4 max-w-sm">
            <div className="overflow-visible py-2">
                <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_API_URL + post?.featured_image}
                    alt={post?.title}
                    className="h-56 object-cover rounded-xl"
                    width={400}
                    height={300}
                />
            </div>
            <h4 className="font-bold text-large">{post?.title}</h4>
        </Link>
    )
}
