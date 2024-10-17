/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['localhost', 'yeshwanth-ecommerce.s3.amazonaws.com', "yeshwanth-ecommerce.s3.eu-north-1.amazonaws.com"],
    },
};

export default nextConfig;
