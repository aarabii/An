/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  env: {
    service_key: process.env.EMAILJS_SERVICE_ID,
    template_key: process.env.EMAILJS_TEMPLATE_ID,
    user_key: process.env.EMAILJS_PUBLIC_KEY,
  }
};

export default nextConfig;
