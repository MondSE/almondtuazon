import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/almondtuazon" : "",
  assetPrefix: isProd ? "/almondtuazon/" : "",
};

export default nextConfig;
