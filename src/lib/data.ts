export const getTheLatestPosts = async (): Promise<Post[]> => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/posts?limit=8`);

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    const posts = await data.json();

    return posts;
};
