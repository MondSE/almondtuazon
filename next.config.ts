/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  images: {
    unoptimized: true,
  },
  basePath: "/almondtuazon",
  assetPrefix: "/almondtuazon/",
  trailingSlash: true, // 👈 helps with routing on GitHub Pages
};

module.exports = nextConfig;
