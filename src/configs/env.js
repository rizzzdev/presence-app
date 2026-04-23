const env = process.env.NEXT_PUBLIC_ENV || "dev";
const devApiUrl = process.env.NEXT_PUBLIC_DEV_API_URL;
const prodApiUrl = process.env.NEXT_PUBLIC_PROD_API_URL;

export const apiUrl = env === "prod" ? prodApiUrl : devApiUrl;
