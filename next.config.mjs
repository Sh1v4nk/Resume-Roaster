/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Exclude pdf-parse test files from the bundle
            config.externals.push({
                "pdf-parse": "commonjs pdf-parse",
            });
        }
        return config;
    },
};

export default nextConfig;
