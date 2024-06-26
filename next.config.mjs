/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

module.exports = {
  images: {
    loader: 'imgix',
    path: '/',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/weather-dashboard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/weather-dashboard/' : '',
};
