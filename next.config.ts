import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? "/almondtuazon" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/almondtuazon/" : "",
  trailingSlash: true, // 👈 helps with routing on GitHub Pages
};

export default nextConfig;
