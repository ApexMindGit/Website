import type { NextConfig } from "next";
const config: NextConfig = {
  typescript: {
    tsconfigPath: process.env.APEX_BUILD === "1" ? "tsconfig.production.json" : "tsconfig.json",
  },
  distDir: process.env.APEX_BUILD === "1" ? ".next-production" : ".next",
  poweredByHeader: false,
};
export default config;
