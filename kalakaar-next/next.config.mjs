/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 👈 YEH HAI MASTER KEY (All Domains Allowed)
      },
      {
        protocol: 'http',
        hostname: '**', // Agar koi purani bina SSL wali site ho
      }
    ],
  },
};

export default nextConfig;