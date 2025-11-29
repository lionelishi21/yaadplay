/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure path alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
}

module.exports = nextConfig



