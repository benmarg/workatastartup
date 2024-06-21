/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bookface-images.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'dashboard.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            }
        ],
    }
};

export default config;
