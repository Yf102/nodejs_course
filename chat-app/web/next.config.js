/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const API = process.env.NEXT_PUBLIC_API
    console.log(`Proxy created: /api -> : ${API}`)

    return [
      {
        source: '/api/:path*', //@TODO node_env
        destination: `${API}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
