import Link from "next/link";

export const metadata = {
  title: "PromoHub – All Your Promo Codes in One Link | Creator Promo Manager",
  description:
    "PromoHub helps creators organise, update, and share all their promo codes in one beautiful, SEO-friendly page. Stop losing conversions to expired codes.",
  openGraph: {
    title: "PromoHub – One Link for All Your Promo Codes",
    description:
      "The easiest way for creators to manage and share promo codes. Organise, update, and track all your affiliate deals from one central hub.",
  },
};

export default function HomePage() {
  return (
    <main className="py-20 space-y-28">

      {/* ---------- HERO SECTION ---------- */}
      <section className="space-y-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Manage All Your Promo Codes in One Link  
          <span className="block text-neutral-400 mt-2">
            The smarter way creators share affiliate deals.
          </span>
        </h1>

        <p className="text-neutral-300 text-lg max-w-2xl leading-relaxed">
          PromoHub is a centralised promo-code manager designed for YouTube
          creators, influencers, and affiliate marketers. Organise every promo
          code, track expiry dates, and give your viewers instant access to the 
          right deal — every time.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold"
          >
            Create Your Free Promo Page
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg border border-neutral-600 font-semibold"
          >
            Log In
          </Link>
        </div>

        <p className="text-sm text-neutral-500">Takes 60 seconds · No credit card needed</p>

        {/* Illustration placeholder */}
        <div className="mt-10 border border-neutral-800 rounded-2xl p-8 bg-neutral-900/30">
          <p className="text-center text-neutral-500 text-sm">
            {/* Replace with your illustration */}
            [ Illustration: Creator using a dashboard to manage promo codes ]
          </p>
        </div>
      </section>



      {/* ---------- PROBLEM SECTION ---------- */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold">Stop Losing Money to Expired Promo Codes</h2>
        <p className="text-neutral-300 leading-relaxed text-base">
          Every day, creators lose affiliate revenue because viewers click old 
          video descriptions, outdated promos, or expired partner links. PromoHub 
          eliminates that problem permanently.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          With a single shareable link, your audience always sees your latest 
          verified promo codes — organised, clear, and optimised for conversions.
        </p>
      </section>



      {/* ---------- FEATURE GRID WITH ICONS ---------- */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold max-w-3xl">
          Features Built for Professional Creators
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">📦</div>
            <h3 className="font-semibold text-lg">
              All promo codes in one place
            </h3>
            <p className="text-sm text-neutral-400">
              Consolidate every deal, affiliate code, and brand offer into a 
              clean, shareable creator page.
            </p>
          </div>

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">⏳</div>
            <h3 className="font-semibold text-lg">Automatic expiry countdowns</h3>
            <p className="text-sm text-neutral-400">
              Out-of-date promo codes are removed automatically. No maintenance 
              required.
            </p>
          </div>

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">📊</div>
            <h3 className="font-semibold text-lg">Click-optimised layout</h3>
            <p className="text-sm text-neutral-400">
              Built to maximise conversions and make brand partners happy.
            </p>
          </div>

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">🗂️</div>
            <h3 className="font-semibold text-lg">Category filters</h3>
            <p className="text-sm text-neutral-400">
              VPNs, finance, gaming, tech, cosmetics — everything is neatly
              organised.
            </p>
          </div>

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">🔗</div>
            <h3 className="font-semibold text-lg">One simple share link</h3>
            <p className="text-sm text-neutral-400">
              Use your promo hub link across every platform: YouTube, TikTok, Instagram, X, or blogs.
            </p>
          </div>

          {/* Feature */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="text-3xl">📥</div>
            <h3 className="font-semibold text-lg">Bulk upload support</h3>
            <p className="text-sm text-neutral-400">
              Import dozens of brand deals instantly with our CSV template.
            </p>
          </div>

        </div>
      </section>



      {/* ---------- ILLUSTRATION SECTION ---------- */}
      <section className="max-w-4xl space-y-6">
        <h2 className="text-3xl font-semibold">
          Built for creators of all niches
        </h2>
        <p className="text-neutral-300 max-w-2xl leading-relaxed">
          Tech reviewers, gamers, fashion influencers, fitness coaches,
          productivity creators, and finance educators — PromoHub is built to
          support every type of affiliate workflow.
        </p>

        {/* Illustration Slot */}
        <div className="border border-neutral-800 rounded-2xl p-8 bg-neutral-900/30">
          <p className="text-center text-neutral-500 text-sm">
            [ Illustration: diverse creators with icons for VPN, tech, gaming, finance ]
          </p>
        </div>
      </section>



      {/* ---------- HOW IT WORKS SECTION ---------- */}
      <section className="max-w-3xl space-y-8">
        <h2 className="text-3xl font-semibold">How PromoHub Works</h2>

        <div className="space-y-7">
          <div className="flex gap-4">
            <div className="text-2xl font-bold">1</div>
            <div>
              <h3 className="font-medium">Create your free creator account</h3>
              <p className="text-neutral-400 text-sm">
                Sign up in under 60 seconds — no card required.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-2xl font-bold">2</div>
            <div>
              <h3 className="font-medium">Add or import all your promo codes</h3>
              <p className="text-neutral-400 text-sm">
                Use our clean dashboard or upload them in bulk with a CSV.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-2xl font-bold">3</div>
            <div>
              <h3 className="font-medium">Share your creator promo page</h3>
              <p className="text-neutral-400 text-sm">
                Add it to every YouTube description, bio, and pinned comment.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ---------- CTA SECTION ---------- */}
      <section className="max-w-3xl text-center space-y-6">
        <h2 className="text-3xl font-semibold">Start Organising Your Promo Codes Today</h2>
        <p className="text-neutral-300">
          Increase conversions. Keep viewers happy. Impress brand partners.
        </p>

        <Link
          href="/register"
          className="inline-block px-8 py-4 rounded-lg bg-white text-black font-semibold text-lg"
        >
          Create My Promo Page
        </Link>

        <p className="text-sm text-neutral-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </section>


      {/* ---------- SEO SCHEMA MARKUP ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PromoHub",
            applicationCategory: "MarketingTool",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free promo-code manager for content creators."
            },
            description:
              "PromoHub is the easiest way for creators to manage and share promo codes. Includes expiry timers, categories, and bulk upload.",
            url: "https://yourdomain.com",
          }),
        }}
      />
    </main>
  );
}
