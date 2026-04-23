const env = process.env.NEXT_PUBLIC_ENV || "dev";
const devApiUrl = process.env.NEXT_PUBLIC_DEV_API_URL;
const prodApiUrl = process.env.NEXT_PUBLIC_PROD_API_URL;

export const apiUrl = env === "prod" ? prodApiUrl : devApiUrl;

console.log({ apiUrl });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: apiUrl + "/:path*",
      },
    ];
  },
};

export default nextConfig;
