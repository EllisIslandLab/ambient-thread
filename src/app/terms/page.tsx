import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

const TITLE = "Terms of Use | Ambient Thread Foundation";
const DESCRIPTION = "The terms for using the Ambient Thread Foundation website, including our wellness disclaimer and how donations work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: { type: "website", url: `${SITE_URL}/terms`, siteName: "Ambient Thread Foundation", title: TITLE, description: DESCRIPTION, locale: "en_US" },
};

const a = "text-gold-bright underline underline-offset-4 hover:text-paper";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The Fine Print"
      title="Terms of Use."
      updated="October 22, 2026"
      intro={
        <p>
          These terms apply to ambientthread.org, run by the Ambient Thread Foundation, a New Mexico nonprofit and
          501(c)(3) public charity. By using the site you agree to them. If you don&rsquo;t agree, please don&rsquo;t use
          the site.
        </p>
      }
      sections={[
        {
          heading: "Information, not medical advice",
          body: (
            <>
              <p>
                Everything on this site is general information about our mission, our community and the listening
                app we are developing. It is not medical advice, diagnosis or treatment. The app and the foundation are
                intended solely for general wellness purposes; the app is not an FDA-approved medical device or a
                registered hearing aid.
              </p>
              <p>
                If you have hearing loss, sudden changes in your hearing, or any medical concern, please talk to a
                licensed healthcare professional.
              </p>
            </>
          ),
        },
        {
          heading: "Our app is in development",
          body: (
            <p>
              Descriptions of the app, its features and its timing reflect our current plans. They may change as we
              learn from the community, and nothing on this site is a promise that a particular feature or release
              date will be delivered.
            </p>
          ),
        },
        {
          heading: "Donations",
          body: (
            <p>
              Donations are made through Zeffy and are subject to Zeffy&rsquo;s terms. As a 501(c)(3) public charity, we
              issue receipts for tax-deductible gifts to the extent allowed by law; please consult a tax professional
              about your situation. If you believe a donation was made in error, email{" "}
              <a className={a} href="mailto:Admin@ambientthread.org">
                Admin@ambientthread.org
              </a>{" "}
              within 30 days and we will work with you on a refund where possible.
            </p>
          ),
        },
        {
          heading: "Using the site",
          body: (
            <p>
              Please don&rsquo;t misuse the site: no attempts to break or overload it, no automated scraping, and no
              spam or unlawful content through the contact form. We may block access for anyone who does.
            </p>
          ),
        },
        {
          heading: "Our content",
          body: (
            <p>
              The text, photos, logo and design of this site belong to the Ambient Thread Foundation or are used with
              permission. You are welcome to share links and quote short passages with credit; please ask before
              reusing anything else.
            </p>
          ),
        },
        {
          heading: "Links to other sites",
          body: (
            <p>
              We link to partners and other organizations we think are helpful. We don&rsquo;t control those sites and
              aren&rsquo;t responsible for their content or practices.
            </p>
          ),
        },
        {
          heading: "No warranties, limited liability",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo;. We work to keep it accurate and available, but we can&rsquo;t
              guarantee it will always be complete, current or error free. To the fullest extent allowed by law, the
              foundation is not liable for any loss arising from your use of the site.
            </p>
          ),
        },
        {
          heading: "Changes, governing law and contact",
          body: (
            <>
              <p>
                We may update these terms and will change the date at the top when we do. These terms are governed by
                the laws of the State of New Mexico. Your privacy is covered by our{" "}
                <a className={a} href="/privacy">
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                Questions:{" "}
                <a className={a} href="mailto:Admin@ambientthread.org">
                  Admin@ambientthread.org
                </a>{" "}
                or{" "}
                <a className={a} href="tel:+15057504327">
                  (505) 750-4327
                </a>
                . Mailing address: Ambient Thread Foundation, 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
