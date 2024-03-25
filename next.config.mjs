/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login', // Adjust the destination if your login route is different.
                permanent: false, // Set to true if this redirect should be permanent
            },
        ];
    },
};

export default nextConfig;
