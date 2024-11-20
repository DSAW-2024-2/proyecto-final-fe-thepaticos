/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
			},
			{
				protocol: 'https',
				hostname: 'aacarsdna.com',
			},
		],
	},
};

export default nextConfig;
