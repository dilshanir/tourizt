import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy", description: `How ${site.name} handles the details you send in an enquiry.` };

const sections = [
  { t: "What we collect", p: ["When you send an enquiry we collect what you type into the form: the places you're interested in, your rough dates and trip length, who is travelling, your pace and budget range, your name and email, and optionally your phone number and a message."] },
  { t: "Why we collect it", p: ["Only to reply to your enquiry and to plan the trip you ask about. We don't use it for anything unrelated, and we don't sell it."] },
  { t: "Who sees it", p: [`Your enquiry goes to the ${site.name} team. We may use service providers, such as email, hosting and form-handling services, to receive and store it. They may only handle it on our behalf.`] },
  { t: "How long we keep it", p: ["We keep enquiry details only as long as we need them to deal with your enquiry and any trip that follows, and for any legal or accounting duties. After that we delete them."] },
  { t: "Your rights", p: ["You can ask us to show you the information we hold about you, correct it, or delete it, and you can object to how we use it. If you're in the UK or EU you can also complain to your data protection authority. To use any of these rights, send us an enquiry through the form and say so."] },
  { t: "Cookies and tracking", p: ["This site doesn't set advertising cookies. It uses your browser's session storage only to remember that you've already seen the loading screen in that tab."] },
  { t: "Changes", p: ["If we change this page we'll update it here."] },
];

export default function Privacy() {
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <h1 className="font-display text-display leading-[0.95]">Privacy</h1>
        <p className="mt-8 max-w-prose">This explains what happens to the details you send us through the enquiry form.</p>
        <div className="mt-12 max-w-prose space-y-10">
          {sections.map((s) => (
            <section key={s.t}>
              <h2 className="font-display text-3xl">{s.t}</h2>
              {s.p.map((x) => <p key={x} className="mt-3">{x}</p>)}
            </section>
          ))}
        </div>
        <Link href="/plan" className="mt-16 inline-block underline underline-offset-8">Contact us through the enquiry form</Link>
      </main>
      <Footer />
    </>
  );
}
