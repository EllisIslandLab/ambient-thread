// The foundation's permanent home. Until DNS cuts over, the site is served from
// ambient-thread.vercel.app; canonical/og:url already point at the real domain so
// search engines consolidate there, while og:image stays on the serving host
// (via metadataBase) so link previews keep working pre-cutover.
export const SITE_URL = "https://ambientthread.org";
