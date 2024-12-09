/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cloud.appwrite.io'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };

export default nextConfig;
