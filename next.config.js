/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
      // Next.jsのImageコンポーネントで許可される画像のドメインを指定。
      // これにより、指定したドメインからの画像リソースの利用が許可され、外部の画像を表示できる
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;