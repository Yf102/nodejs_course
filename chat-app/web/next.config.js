/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const API = process.env.API
    console.log(`Proxy created: /api -> : ${API}`)

    return [
      {
        source: '/api/:slug*', //@TODO node_env
        destination: `${API}/api/:slug*`,
      },
    ]
  },
}

module.exports = nextConfig
