import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  // other Next.js config here
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
};

export default withPWA(pwaConfig)(nextConfig);
