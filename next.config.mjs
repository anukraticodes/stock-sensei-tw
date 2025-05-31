/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export", // Enable static export for GitHub Pages
  basePath: "/stock-sensei-tw", // Set the base path to the repository name
  assetPrefix: "/stock-sensei-tw", // Prefix for assets to match GitHub Pages requirements
};

export default nextConfig;
