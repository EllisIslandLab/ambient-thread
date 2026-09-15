/** @type {import('next').NextConfig} */
// DEMO_ACCESS_KEY set (Vercel, pitch phase) -> server build so the src/proxy.ts
// access gate runs. Unset (QA `npx next build` + serve out/, static handoff to
// Cloudflare Pages/Netlify, post-transfer) -> plain static export, gate inert.
const gated = !!process.env.DEMO_ACCESS_KEY;

const nextConfig = {
  ...(gated ? {} : { output: 'export' }),
  images: { unoptimized: true },
};

export default nextConfig;
