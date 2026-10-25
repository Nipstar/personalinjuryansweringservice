import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // One URL form: no trailing slash. Cloudflare 301s the other form.
  trailingSlash: false,
  // Inline the (small) stylesheet so it doesn't block first paint.
  experimental: { inlineCss: true },
};

export default nextConfig;
