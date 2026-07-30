/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverActions: {
    allowedOrigins: ['localhost:5173', '127.0.0.1:5173']
  }
}

module.exports = nextConfig
