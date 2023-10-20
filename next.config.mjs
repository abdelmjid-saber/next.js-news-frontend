/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['nextjsnews.tailwindcraft.com', 'ui-avatars.com',],
  },
};

export default nextConfig;
