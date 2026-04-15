/**
 * Next.js Configuration
 *
 * Enables the styled-components SWC compiler plugin for:
 * - Consistent className generation between server and client (avoids hydration mismatches)
 * - Better debugging with displayName in development
 * - Smaller bundle size via dead code elimination
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
