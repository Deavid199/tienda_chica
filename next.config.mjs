/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
