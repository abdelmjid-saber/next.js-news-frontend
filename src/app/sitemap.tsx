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


const getAllPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const posts = await data.json();

    return posts;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let articles = await getAllPosts()
    const changeFrequency = 'daily' as changeFrequency

    const posts = articles.data.map((post) => ({
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
