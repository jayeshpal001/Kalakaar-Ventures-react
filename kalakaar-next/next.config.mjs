/** @type {import('next').NextConfig} */
const nextConfig = {
  // NEXT 16 STANDALONE: Vercel par deployment errors avoid karne ke liye
  output: 'standalone', 

  images: {
    // SECURITY NOTE: Humne wildcard allowed rakha hai projects ke liye
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http',
        hostname: '**', 
      }
    ],
    // Deployment phase mein image optimize karne se 404/Timeout aa sakta hai
    // Isliye hum use bypass kar rahe hain
    unoptimized: true, 
  },

  // Redux aur Framer Motion ke liye hydration errors minimize karne ke liye
  reactStrictMode: true,
};

export default nextConfig;