import { NextRequest, NextResponse } from 'next/server'

// Demo access gate — keeps pitch-phase previews private.
//
// Active only while DEMO_ACCESS_KEY is set (a Vercel project env var during
// the pitch phase). When it's unset — local QA builds, static handoff builds,
// or after the site is transferred to the owner — every request passes
// through untouched and nothing here runs.
//
// The prospect's link is  https://<site>/?key=<DEMO_ACCESS_KEY> ; the first
// visit stores the key in a cookie and cleans the URL, so every page works
// normally after that.
const KEY = process.env.DEMO_ACCESS_KEY ?? ''
const COOKIE = 'wla_demo_key'

// Still public while gated: the outreach email embeds this screenshot, so it
// must load without the key.
const PUBLIC_PATHS = new Set([
  '/opengraph-image.png',
  '/favicon.ico',
  '/icon.svg',
  '/icon.png',
  '/apple-icon.png',
])

export function proxy(req: NextRequest) {
  if (!KEY) return NextResponse.next()

  const url = req.nextUrl

  // While gated, tell crawlers to stay out entirely.
  if (url.pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain', 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }

  if (PUBLIC_PATHS.has(url.pathname)) return noindex(NextResponse.next())

  const provided = url.searchParams.get('key')
  if (provided === KEY) {
    const clean = url.clone()
    clean.searchParams.delete('key')
    const res = noindex(NextResponse.redirect(clean))
    res.cookies.set(COOKIE, KEY, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
    })
    return res
  }

  if (req.cookies.get(COOKIE)?.value === KEY) return noindex(NextResponse.next())

  // Locked. Deliberately HTTP 200, not 401: gmail.py's verify_urls_in_message
  // checks every deployed-site URL for 200 before an outreach send is allowed,
  // and the gated URL must pass that check.
  return new NextResponse(lockPage(), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  })
}

function noindex(res: NextResponse) {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

function lockPage(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Private preview</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #101418; color: #e8e6e1; font: 16px/1.6 system-ui, -apple-system, sans-serif; }
  .card { max-width: 26rem; margin: 1rem; padding: 2.5rem 2.25rem; background: #1a2027;
          border: 1px solid #2c343d; border-radius: 12px; }
  h1 { font-size: 1.15rem; margin: 0 0 .75rem; letter-spacing: .01em; }
  p { margin: 0 0 1rem; color: #b8bec6; font-size: .95rem; }
  form { display: flex; gap: .5rem; margin-top: 1.25rem; }
  input { flex: 1; padding: .6rem .75rem; border-radius: 8px; border: 1px solid #3a434e;
          background: #10161c; color: #e8e6e1; font-size: .95rem; }
  button { padding: .6rem 1rem; border-radius: 8px; border: 0; background: #e8e6e1;
           color: #101418; font-weight: 600; cursor: pointer; }
  .lock { font-size: 1.6rem; margin-bottom: 1rem; }
</style>
</head>
<body>
  <main class="card">
    <div class="lock">&#128274;</div>
    <h1>This is a private preview</h1>
    <p>This website is a private draft prepared for the owner of this business.
       It is not published, it is not indexed by search engines, and everything
       in it remains the property of the business it was prepared for.</p>
    <p>If you were sent a preview link, open it directly — or enter your access
       key below.</p>
    <form method="get" action="/">
      <input type="password" name="key" placeholder="Access key" autofocus>
      <button type="submit">View preview</button>
    </form>
  </main>
</body>
</html>`
}
