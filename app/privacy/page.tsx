import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <h1 className="font-display text-display leading-[0.95]">Privacy</h1>
        <p className="mt-10 max-w-prose">The enquiry form collects the answers you type in, to reply to your enquiry.</p>
        <p className="mt-6 max-w-prose border border-dashed border-ink/40 p-4 text-sm">Placeholder: the full privacy policy must be written or approved by the business owner before launch (data controller, retention, your rights).</p>
      </main>
      <Footer />
    </>
  );
}
