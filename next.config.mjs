/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://www.github.com/aarabii",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/aarab-nishchal",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://www.twitter.com/aarab_ii",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/aarab.ii",
        permanent: true,
      },
      {
        source: "/facebook",
        destination: "https://www.facebook.com/zzcwc",
        permanent: true,
      },
      {
        source: "/telegram",
        destination: "https://t.me/aarab_ii",
        permanent: true,
      },
      {
        source: "/snapchat",
        destination: "https://www.snapchat.com/add/aarab.ii",
        permanent: true,
      },
      {
        source: "/leetcode",
        destination: "https://leetcode.com/u/aarabii",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:aarab.nishchal@gmail.com",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/docs/resume.pdf",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/contact",
        destination: "/",
      },
      {
        source: "/projects",
        destination: "/",
      },
      {
        source: "/experience",
        destination: "/",
      },
      {
        source: "/skills",
        destination: "/",
      },
    ];
  },
  env: {
    service_key: process.env.EMAILJS_SERVICE_ID,
    template_key: process.env.EMAILJS_TEMPLATE_ID,
    user_key: process.env.EMAILJS_PUBLIC_KEY,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
