import { MetadataRoute } from 'next'

const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000'

type changeFrequency =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'


type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    created_at: string;
    updated_at: string;
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

const getAllPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts?limit=8`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const response = await data.json();
    const posts = response.data;

    return posts;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let articles = await getAllPosts()
    const changeFrequency = 'daily' as changeFrequency

    const posts = articles.map((post) => ({
        url: `${WEBSITE_URL}/${post.slug}`,
        lastModified: post.updated_at,
        changeFrequency,
    }))

    const routes = ['', '/privacy-policy', '/terms-and-conditions', 'contact'].map((route) => ({
        url: `${WEBSITE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }))

    return [...routes, ...posts]
}
