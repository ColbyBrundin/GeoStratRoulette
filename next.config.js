/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Add support for importing CSV files as raw text
    config.module.rules.push({
      test: /\.csv$/,
      use: 'raw-loader',
    });
    return config;
  },
}

module.exports = nextConfig

