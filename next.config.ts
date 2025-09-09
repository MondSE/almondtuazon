import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/almondtuazon" : "",
  assetPrefix: isProd ? "/almondtuazon/" : "",
  trailingSlash: true, // 👈 helps with routing on GitHub Pages
};

export default nextConfig;
