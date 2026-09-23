import type { NextConfig } from "next";
const config: NextConfig = {
  typescript: {
    tsconfigPath: process.env.APEX_BUILD === "1" ? "tsconfig.production.json" : "tsconfig.json",
  },
  // Local builds write to .next-production so `pnpm build` can run alongside
  // a live `pnpm dev` without clobbering its .next cache. Vercel must always
  // get the standard .next dir, since its builder resolves distDir from this
  // file before APEX_BUILD is set in the build script's child process env.
  distDir: process.env.VERCEL ? ".next" : process.env.APEX_BUILD === "1" ? ".next-production" : ".next",
  poweredByHeader: false,
};
export default config;
