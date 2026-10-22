import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

const TITLE = "Privacy Policy | Ambient Thread Foundation";
const DESCRIPTION = "What the Ambient Thread Foundation website collects, why, who it is shared with, and how to ask us to delete it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { type: "website", url: `${SITE_URL}/privacy`, siteName: "Ambient Thread Foundation", title: TITLE, description: DESCRIPTION, locale: "en_US" },
};

const a = "text-gold-bright underline underline-offset-4 hover:text-paper";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your Privacy"
      title="Privacy Policy."
      updated="October 22, 2026"
      intro={
        <p>
          The Ambient Thread Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a New Mexico nonprofit and 501(c)(3)
          public charity. This policy explains what this website (ambientthread.org) collects, why, and the choices
          you have. We collect as little as we can, we never sell personal information, and we never use it for
          advertising profiles.
        </p>
      }
      sections={[
        {
          heading: "When you contact us",
          body: (
            <>
              <p>
                If you send a message through the contact form, we receive your name, email address, what you are
                interested in, and your message. Basic technical information (such as your internet address) is used
                briefly to block spam and repeated automated submissions.
              </p>
              <p>
                Messages are stored in a secure database hosted by Supabase and can be read only by the
                foundation&rsquo;s administrators. We use them to reply to you and, if you ask, to keep you informed about
                our work. If the form ever fails, your own email app opens instead and the message is sent by regular
                email.
              </p>
            </>
          ),
        },
        {
          heading: "Donations",
          body: (
            <p>
              Donations are processed by Zeffy, a free fundraising platform. Your payment details go directly to Zeffy
              and its payment processor; we never see or store your card number. Zeffy shares your name, contact
              details and gift amount with us so we can thank you and send tax receipts. Zeffy&rsquo;s own{" "}
              <a className={a} href="https://support.zeffy.com/legal-data-privacy-security" target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>{" "}
              covers what happens on its pages.
            </p>
          ),
        },
        {
          heading: "Analytics and cookies",
          body: (
            <>
              <p>
                We use Google Analytics to understand how many people visit and which pages help them, which also
                supports our Google Ad Grants nonprofit program. Google Analytics sets cookies and receives information
                such as the pages you view, your approximate location and your device type. You can opt out with{" "}
                <a className={a} href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Google&rsquo;s opt-out browser add-on
                </a>{" "}
                or by blocking cookies in your browser.
              </p>
              <p>
                Our website partner, Web Launch Academy, also runs a small cookie-free visit counter that helps keep the
                site healthy. It does not identify you. We do not use advertising or social media tracking pixels.
              </p>
            </>
          ),
        },
        {
          heading: "Who we share information with",
          body: (
            <p>
              Only the service providers that run the site and process your request: Vercel (website hosting),
              Supabase (secure message storage), Zeffy (donations), Google (analytics) and Web Launch Academy (website
              maintenance). Each handles information only to provide its service. We may also disclose information if
              the law requires it. We do not sell, rent or trade personal information.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              Contact messages are kept while they are useful for our conversation with you and our records, and you
              can ask us to delete them at any time. Donation records are kept as long as nonprofit tax and accounting
              rules require.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask to see, correct or delete the information we hold about you, or ask us to stop contacting
              you, by emailing{" "}
              <a className={a} href="mailto:Admin@ambientthread.org">
                Admin@ambientthread.org
              </a>
              . We will respond within 30 days.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              This website is intended for adults. We do not knowingly collect personal information from children
              under 13. If you believe a child has sent us information, contact us and we will delete it.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <>
              <p>
                If we change this policy, we will update the date at the top of this page. Questions are welcome at{" "}
                <a className={a} href="mailto:Admin@ambientthread.org">
                  Admin@ambientthread.org
                </a>{" "}
                or{" "}
                <a className={a} href="tel:+15057504327">
                  (505) 750-4327
                </a>
                .
              </p>
              <p>Mailing address: Ambient Thread Foundation, 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110.</p>
            </>
          ),
        },
      ]}
    />
  );
}
