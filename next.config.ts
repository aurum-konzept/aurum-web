import type { NextConfig } from "next";

// next.config.ts
const nextConfig = {
  images: { unoptimized: true }, // optional, aber empfehlenswert für VPS ohne Next Image Optimizer Setup
};

module.exports = nextConfig;


export default nextConfig;