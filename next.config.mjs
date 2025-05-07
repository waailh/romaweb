import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const oldSiteUrl = process.env.NEXT_PUBLIC_OLD_SITE;

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/api/v2/:path*",
        destination: `${oldSiteUrl}/api/v2/:path*`,
        permanent: false, // Use permanent: false if you want a temporary redirect
      },
      {
        source: "/admin",
        destination: process.env.NEXT_PUBLIC_ADMIN_WEBSITE_URL,
        permanent: false, // Use permanent: false if you want a temporary redirect
      },
    ];
  },

  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

// export default nextConfig;
export default withNextIntl(nextConfig);
