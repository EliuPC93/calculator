/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        socketApi: process.env.API + "/v1/calculator-websocket"
    }
};

export default nextConfig;
