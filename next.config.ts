import type { NextConfig } from "next";
const config: NextConfig = {
  agentRules: false,
  turbopack: { root: process.cwd() },
  env: {
    NEXT_PUBLIC_VERCEL_ENV:
      process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "",
  },
};
export default config;
