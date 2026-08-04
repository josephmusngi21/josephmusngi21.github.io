import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [100, 75, 70],
  },
};

export default withMDX(nextConfig);
