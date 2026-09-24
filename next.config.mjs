/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
// "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
