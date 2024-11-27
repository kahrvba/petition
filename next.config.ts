// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config, { isServer }) {
        // Exclude Node.js modules when building for the client
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                child_process: false,
                http2: false,
                tls: false,
            };
        }

        return config;
    },
};

export default nextConfig;
