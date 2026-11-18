import type { Metadata } from "next";
import Enquiry from "@/components/sections/Enquiry";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = { title: "Plan my journey", description: "Tell us where, when and who. We'll reply with a first sketch of a route." };

export default function Plan() {
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <p className="mb-6 text-sm uppercase tracking-widest text-laterite">Plan my journey</p>
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
