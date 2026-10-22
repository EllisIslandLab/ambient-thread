import { Nav, Footer, DONATE_URL } from "@/components/SiteChrome";
import { Contact } from "@/components/HomeContact";
import { StickyBar } from "@/components/StickyBar";
import { IconCompass, IconConversation, IconEar, IconHeadphones, IconHeart, IconInstagram, IconMail, IconSliders } from "@/components/icons";

/* ----------------------------------------------------------------------------
   Ambient Thread Foundation
   Concept: "a quieter world." Stillness as design language. Navy and gold from
   the foundation's own logo; the flowing thread from the mark recurs as the
   site's single decorative motif. All copy sourced from the foundation's own
   published material.
---------------------------------------------------------------------------- */

/* --------------------------- Decorative thread ---------------------------- */

function ThreadDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 90" fill="none" className="w-full" preserveAspectRatio="none">
        <path
          d="M0 60 C 220 20, 380 85, 560 55 C 720 28, 800 70, 960 52 C 1140 32, 1280 68, 1440 40"
          stroke="#D0B040"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <circle cx="960" cy="52" r="2.5" fill="#D0B040" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/* ---------------------------------- Hero ----------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92svh] flex-col overflow-hidden bg-navy pt-24">
      {/* The lotus mark, blooming quietly out of the right edge. Its background
          is the exact same navy as the page, so it sits seamlessly. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 hidden w-[520px] -translate-y-1/2 select-none md:block lg:w-[620px]">
        <img src="/images/lotus-mark.webp" alt="Gold lotus flower emblem of the Ambient Thread Foundation on a navy background" width={500} height={500} className="w-full" />
      </div>

      {/* Faint full-width thread behind the headline */}
      <svg aria-hidden="true" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/3 h-[400px] w-full select-none opacity-40">
        <path
          className="thread-line"
          d="M-20 300 C 240 180, 420 330, 640 250 C 830 180, 950 280, 1120 220 C 1260 170, 1360 230, 1460 190"
          stroke="#D0B040"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-20 pt-10 sm:px-8">
        <p className="eyebrow mb-6 text-gold-bright">A Nonprofit Foundation</p>

        <h1 className="font-display max-w-3xl text-5xl font-semibold text-paper sm:text-6xl lg:text-7xl">
          The world is loud.
        </h1>
        <p className="font-display mt-4 max-w-2xl text-2xl font-medium italic text-paper/90 sm:text-3xl">
          We want to help people navigate it with more clarity and confidence.
        </p>

        <p className="mt-8 max-w-xl text-lg text-paper/80">
          Ambient Thread Foundation brings inclusive, personalized audio management to the
          sound-sensitive community: thoughtful software for people with different hearing
          and auditory needs.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/30 bg-navy px-8 py-3.5 text-base font-bold text-paper transition-colors duration-200 hover:border-gold hover:text-gold-bright"
          >
            Support the Mission
          </a>
          <a
            href="#story"
            className="rounded-full bg-gold px-8 py-3.5 text-base font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
          >
            Read Melissa&rsquo;s Story
          </a>
        </div>

        {/* Quiet credibility line */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-paper/60">
          <span className="flex items-center gap-2">
            <IconHeadphones className="h-5 w-5 text-gold" />
            Works with the headphones you already own
          </span>
          <span className="flex items-center gap-2">
            <IconHeart className="h-5 w-5 text-gold" />
            Accessibility first, always
          </span>
        </div>
      </div>

      {/* Mobile lotus, below text */}
      <div aria-hidden="true" className="pointer-events-none relative mx-auto -mb-10 w-64 select-none md:hidden">
        <img src="/images/lotus-mark.webp" alt="Gold lotus flower emblem of the Ambient Thread Foundation on a navy background" width={500} height={500} className="w-full" />
      </div>
    </section>
  );
}

/* --------------------------- Outcomes strip -------------------------------- */

const OUTCOMES = ["Everyday Comfort", "Situational Awareness", "Communication", "Connection"];

function OutcomesStrip() {
  return (
    <section aria-label="What we work to improve" className="border-y border-gold/25 bg-navy-deep">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 sm:px-8">
        {OUTCOMES.map((o, i) => (
          <span key={o} className="flex items-center gap-10">
            <span className="eyebrow text-paper/75">{o}</span>
            {i < OUTCOMES.length - 1 && (
              <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-gold/60 sm:block" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Mission --------------------------------- */

function Mission() {
  return (
    <section id="mission" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
              Our Mission
            </p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Making everyday listening easier, for everyone.
            </h2>
            <div aria-hidden="true" className="mt-8 h-px w-24 bg-gold" />
            <p className="mt-8 text-lg text-ink-soft">
              We believe everyone should have access to high-quality audio tools that support
              daily life and allow for personalized listening solutions.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-8 text-lg leading-relaxed text-ink-soft">
              <p>
                The Ambient Thread Foundation is a nonprofit organization focused on making
                everyday listening easier, more accessible, and more inclusive for people with
                different hearing and auditory needs.
              </p>
              <p>
                We provide education, peer-informed support, resource navigation, and an open
                source app for people who have sound sensitivities, such as those who are
                single-sided deaf or hard of hearing.
              </p>
              <p>
                Our goal is to create thoughtful, easy-to-use software that helps people feel
                more comfortable, aware, and connected to the world around them.
              </p>
              <p>
                By making these tools more accessible and affordable, we hope to improve
                everyday comfort, situational awareness, communication, and connection for
                more people.
              </p>
            </div>

            <ul className="mt-12 space-y-6">
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconEar className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Accessible by design</p>
                  <p className="text-ink-soft">
                    Built for people with different hearing and auditory needs, not adapted for
                    them as an afterthought.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconSliders className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Personal, not one-size-fits-all</p>
                  <p className="text-ink-soft">
                    Each person experiences hearing differently, so listening tools should be
                    customizable to the individual.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconHeart className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Affordable on purpose</p>
                  <p className="text-ink-soft">
                    Specialized audio hardware can be prohibitively expensive. Software on the
                    phone you already carry should not be.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Story ---------------------------------- */

function Story() {
  return (
    <section id="story" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/melissa-story-720.webp"
                  srcSet="/images/melissa-story-480.webp 480w, /images/melissa-story-720.webp 720w, /images/melissa-story-960.webp 960w"
                  sizes="(min-width: 1024px) 420px, calc(100vw - 40px)"
                  alt="Melissa Burns, founder of the Ambient Thread Foundation"
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_30%]"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-lg border border-gold/40" />
            </div>
            <p className="mt-6 text-sm text-paper/60">
              Melissa Burns, founder of the Ambient Thread Foundation
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-gold-bright">Melissa&rsquo;s Story</p>
            <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
              One morning, the world sounded completely different.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                Our founder, Melissa Burns, is newly single-sided deaf. After needing urgent
                brain surgery to remove a huge acoustic neuroma in 2024, she woke up, at age
                37, to a completely different listening experience.
              </p>
              <p>
                The shift from balanced, two-sided listening to relying on one side made
                everyday environments feel fundamentally different. Conversations were harder
                to follow, noise brought a familiar feeling of sensory overload, and
                situational awareness took far more attention and energy.
              </p>
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-display text-2xl font-medium italic text-gold-bright">
                  &ldquo;The previous invisible privilege of balanced, two-sided listening
                  became acutely apparent.&rdquo;
                </p>
              </blockquote>
              <p>
                While adjusting to managing sound from a single dominant side, she encountered
                a consistent frustration: a lack of accessible consumer software options to
                help balance everyday environmental noise. The existing specialized audio
                hardware options were prohibitively expensive and lacked customizable consumer
                flexibility.
              </p>
              <p>
                That experience became the foundation for our work. Though we are aware that
                each person experiences hearing loss differently, our goal is to present an
                innovative, user-friendly mobile application. We believe sophisticated
                environmental audio solutions should be accessible to anyone interested in
                optimizing their daily listening.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- The App --------------------------------- */

const APP_FEATURES = [
  {
    icon: IconHeadphones,
    title: "The headphones you already own",
    text: "Designed to help you get more out of standard iOS devices and everyday headphones, with no specialized, costly audio equipment required.",
  },
  {
    icon: IconSliders,
    title: "Advanced sound routing",
    text: "Personalized routing brings features typically associated with expensive dedicated hardware to the phone in your pocket.",
  },
  {
    icon: IconEar,
    title: "Built for asymmetrical listening",
    text: "Made for people who experience uneven listening environments, including those who rely more heavily on one side for hearing.",
  },
  {
    icon: IconConversation,
    title: "Follow conversations more easily",
    text: "Helping you keep up with the people in front of you, even when the room around you refuses to cooperate.",
  },
  {
    icon: IconCompass,
    title: "Stay aware of your surroundings",
    text: "Support for situational awareness, so you can stay connected to what is happening around you.",
  },
  {
    icon: IconHeart,
    title: "Comfort in louder spaces",
    text: "Feel more at ease in restaurants, gatherings, and busy places that used to feel overwhelming.",
  },
];

function PhoneIllustration() {
  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 300 600" fill="none" role="img" aria-label="Illustration of a phone showing personalized left and right listening balance" className="w-full">
        {/* Phone body */}
        <rect x="10" y="10" width="280" height="580" rx="42" fill="#111B3D" stroke="#D0B040" strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="110" y="26" width="80" height="10" rx="5" fill="#0B132B" />

        {/* Title line */}
        <text x="150" y="86" textAnchor="middle" fill="#F7F2E6" fontSize="17" fontWeight="700">
          Your listening, your way
        </text>

        {/* L / R balance */}
        <text x="60" y="140" textAnchor="middle" fill="#E3C96A" fontSize="15" fontWeight="700">L</text>
        <text x="240" y="140" textAnchor="middle" fill="#E3C96A" fontSize="15" fontWeight="700">R</text>
        <line x1="80" y1="135" x2="220" y2="135" stroke="#F7F2E6" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="135" x2="185" y2="135" stroke="#D0B040" strokeWidth="4" strokeLinecap="round" />
        <circle cx="185" cy="135" r="9" fill="#E3C96A" />

        {/* Equalizer bars settling toward calm */}
        <g>
          {[
            { x: 55, h: 90, d: "0s" },
            { x: 85, h: 130, d: "0.6s" },
            { x: 115, h: 70, d: "1.2s" },
            { x: 145, h: 150, d: "0.3s" },
            { x: 175, h: 95, d: "0.9s" },
            { x: 205, h: 125, d: "1.5s" },
            { x: 235, h: 60, d: "0.45s" },
          ].map((b) => (
            <rect
              key={b.x}
              className="eq-bar"
              x={b.x}
              y={330 - b.h}
              width="12"
              height={b.h}
              rx="6"
              fill="#D0B040"
              fillOpacity="0.75"
              style={{ animationDelay: b.d }}
            />
          ))}
        </g>
        <line x1="45" y1="345" x2="255" y2="345" stroke="#F7F2E6" strokeOpacity="0.15" strokeWidth="1.5" />

        {/* Ambient level card */}
        <rect x="40" y="380" width="220" height="72" rx="14" fill="#0B132B" stroke="#D0B040" strokeOpacity="0.3" />
        <text x="58" y="410" fill="#F7F2E6" fontSize="13" opacity="0.8">
          Environment
        </text>
        <text x="58" y="434" fill="#E3C96A" fontSize="15" fontWeight="700">
          Softened for comfort
        </text>

        {/* Thread flourish */}
        <path d="M30 505 C 90 480, 130 520, 180 500 C 220 484, 250 505, 275 495" stroke="#D0B040" strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
        <circle cx="180" cy="500" r="2.5" fill="#E3C96A" />
      </svg>
      <figcaption className="mt-4 text-center text-sm text-ink-soft">
        Concept illustration of personalized listening balance
      </figcaption>
    </figure>
  );
}

function AppSection() {
  return (
    <section id="app" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
            In Development
          </p>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            An accessibility-focused audio app for iOS.
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            Our flagship iOS app is being developed to help users get more out of the
            headphones they already own. Expected in 2027, it will use advanced sound-routing
            technology to bring features typically associated with specialized, costly audio
            equipment to standard iOS devices.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ul className="space-y-9">
              {APP_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-5">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-ink-soft">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <blockquote className="mt-12 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl font-medium italic text-ink">
                This is not about creating a single &ldquo;correct&rdquo; way to hear. It is
                about expanding control, choice, and access for people whose listening needs
                are too often overlooked.
              </p>
            </blockquote>

            <div className="mt-10 rounded-lg border border-navy/15 bg-paper-dim p-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">A note on what this is: </span>
                the app is intended for general wellness and everyday audio customization. It
                is not a medical device, a hearing aid, or a treatment for hearing loss. The
                full statement is in the footer below.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <PhoneIllustration />
            <div className="mx-auto mt-10 max-w-[300px] rounded-lg bg-navy p-6 text-center">
              <p className="eyebrow text-gold-bright">Expected</p>
              <p className="font-display mt-1 text-5xl font-semibold text-paper">2027</p>
              <p className="mt-2 text-sm text-paper/70">on iOS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How We're Building --------------------------- */

const BUILDING_NOW = [
  "Further develop the concept and technology behind our future iOS application",
  "Learn from people with lived experience of hearing loss, asymmetrical hearing, sound sensitivity, and difficult listening environments",
  "Build relationships with accessibility advocates, audio and technology professionals, community organizations, and potential collaborators",
  "Explore ways to make personalized audio support more understandable, attainable, and inclusive",
  "Shape future educational, advocacy, and community-resource efforts alongside the people they are intended to serve",
];

function HowWereBuilding() {
  return (
    <section id="vision" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-gold-bright">Our Vision</p>
            <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
              A world where everyday listening feels more accessible.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                Ambient Thread Foundation envisions a world where people with different
                auditory needs can move through daily life with greater confidence, comfort,
                and connection. Sound is such a large part of everyday moments that people
                forget so many of us experience sound differently.
              </p>
              <p>
                We are in our founding stage. That means we are focused on creating a strong,
                responsible foundation before making promises about outcomes. Right now,
                Ambient Thread is working to:
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {BUILDING_NOW.map((item) => (
                <li key={item} className="flex gap-4">
                  <svg className="mt-1.5 h-4 w-4 shrink-0 text-gold" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m3 8.5 3.5 3.5L13 4" />
                  </svg>
                  <span className="text-paper/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                We believe that people most affected by a problem should have a meaningful
                voice in shaping the solution, which is why we are community-informed by
                design. We will be transparent about what we are learning, what we are still
                exploring, and how feedback informs our next steps.
              </p>
              <p className="font-display text-2xl font-medium italic text-gold-bright">
                After all, it was just noise until Ambient Thread entered the chat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src="/images/stage-performance.webp"
                  alt="A stage performance in warm light, with flowing fabric wings unfurled"
                  width={480}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg border border-gold/40" />
              <p className="mt-5 text-sm text-paper/60">
                Life is meant to be experienced fully. Sound is a thread that connects us to it.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-sm rounded-lg bg-navy-raise p-7">
              <p className="eyebrow text-gold-bright">More Than an App</p>
              <p className="mt-4 leading-relaxed text-paper/80">
                We are committed to more than building an app. Through advocacy, education,
                and community-based inclusion efforts, we hope to make helpful listening
                technology easier to understand and more accessible to the people who could
                benefit from it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Get Involved ------------------------------ */

const INVOLVEMENT = [
  {
    title: "Bring your skills",
    text: "Offer professional expertise or pro-bono support. We are actively seeking skills such as design, legal, accounting, grant research, photography, social media, translation, and wellness expertise. Apply to be a community advisor, subject-matter advisor, or lived experience contributor.",
  },
  {
    title: "Share your perspective",
    text: "Email us your story with permission to share. Give insights about what makes you unique and how hearing loss or sensitivity affects you. Help us understand what support would make the greatest difference.",
  },
  {
    title: "Make an introduction",
    text: "Spread the word about us and our mission. Introduce us to potential partners, venues, businesses, sponsors, journalists, clinicians, educators, community leaders, and more.",
  },
  {
    title: "Join a leadership pipeline",
    text: "Email us to express your interest in future board, committee, ambassador, or internship roles.",
  },
  {
    title: "Help shape our resources",
    text: "Tell us if you would like to review guides or social media posts, test an app concept, join a focus group, or give feedback on website language and accessibility.",
  },
  {
    title: "Stay in the loop",
    text: "Become a founding supporter: follow us on Instagram for launch updates, behind-the-scenes progress, and first access to opportunities.",
  },
];

function GetInvolved() {
  return (
    <section id="involved" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
            Help Shape What Comes Next
          </p>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Ways to get involved.
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            This work grows through the people who join it. Whatever you can offer, from
            lived experience to professional skills to a simple introduction, there is a
            place for it here.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
          {INVOLVEMENT.map((item) => (
            <div key={item.title} className="border-t border-navy/15 pt-6">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:AmbientThread@gmail.com"
            className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-bold text-paper transition-colors duration-200 hover:bg-navy-raise"
          >
            <IconMail className="h-5 w-5 text-gold-bright" />
            Email Us to Get Started
          </a>
          <a
            href="https://instagram.com/AmbientThread"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-navy/30 px-7 py-3.5 font-bold text-ink transition-colors duration-200 hover:border-navy"
          >
            <IconInstagram className="h-5 w-5" />
            Follow @AmbientThread
          </a>
        </div>

        {/* Donate band */}
        <div className="mt-16 rounded-lg bg-navy-deep p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="eyebrow text-gold-bright">Support the Work</p>
              <h3 className="font-display mt-3 text-3xl font-semibold text-paper sm:text-4xl">
                Every donation moves the app closer to launch.
              </h3>
              <p className="mt-4 text-paper/75">
                Contributions go toward development and backend support for the foundation&rsquo;s
                accessibility-focused iOS app. Donations are tax-deductible and processed securely
                through Zeffy.
              </p>
            </div>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-gold px-10 py-4 text-lg font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ------------------------------------ */

const FAQS = [
  {
    q: "How can I support your mission right now?",
    a: "You can support us by making a financial gift through our secure donation page, signing up for our volunteer list, or sharing our mission with your community on social media.",
  },
  {
    q: "Do you accept in-kind donations (supplies, equipment, or services)?",
    a: "Yes! We welcome professional pro-bono services and specific community supplies for the hearing sensitive communities. Please contact our team before sending items so that we can coordinate.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "Yes. The Ambient Thread Foundation is recognized by the IRS as a 501(c)(3) tax-exempt public charity, so your donation is tax-deductible to the fullest extent allowed by law. Our exemption is effective as of our formation date (August 5, 2026), which means gifts made since then also qualify. Please keep your receipt, and consult a tax professional about your individual situation.",
  },
  {
    q: "Where can I find your EIN or official registration details?",
    a: "Transparency is core to our mission. Our EIN is 42-4819969. We are legally registered with the State of New Mexico and recognized by the IRS as a 501(c)(3) public charity (determination letter dated September 17, 2026).",
  },
  {
    q: "Are there any transaction fees taken out of my online donation?",
    a: "No! We use Zeffy to process our online donations, which means 100% of your gift goes directly to our mission. Zeffy does not charge us any platform or credit card processing fees.",
  },
  {
    q: "Can I volunteer remotely from any location?",
    a: "Yes! Because we are a remote organization, we have plenty of digital and remote volunteer opportunities. Please email us to get started.",
  },
];

function Faq() {
  return (
    <section id="faq" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="eyebrow mb-5 text-gold-bright">Questions, Answered</p>
        <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
          Frequently asked questions.
        </h2>

        <div className="mt-12">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-paper marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-gold-bright transition-transform duration-200 group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="pb-7 pr-10 leading-relaxed text-paper/80">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

/* ---------------------------------- Footer ---------------------------------- */

/* ----------------------------------- Page ----------------------------------- */

// A server component: the sections render to plain HTML, and only the contact form
// and the phone sticky bar hydrate as client JavaScript.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-navy"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <OutcomesStrip />
        <Mission />
        <Story />
        <AppSection />
        <HowWereBuilding />
        <GetInvolved />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
