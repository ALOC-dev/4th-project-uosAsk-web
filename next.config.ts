import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  webpack(config) {
    // SVG를 React 컴포넌트로 import할 수 있도록 설정 (webpack 빌드용)
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  turbopack: {
    rules: {
      // Turbopack에서 SVG를 React 컴포넌트로 import할 수 있도록 설정
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
