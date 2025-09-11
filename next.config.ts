import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();


export default nextConfig;