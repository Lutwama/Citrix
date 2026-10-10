import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: {
    // Tree-shake barrel imports from these UI/icon packages.
    optimizePackageImports: ["@chakra-ui/react", "lucide-react", "react-icons"],
  },
};

export default nextConfig;
