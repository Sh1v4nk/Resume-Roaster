/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Ignore pdf-parse test files during bundling
            config.module.rules.push({
                test: /pdf-parse/,
                use: "ignore-loader",
            });
        }
        return config;
    },
};

export default nextConfig;
