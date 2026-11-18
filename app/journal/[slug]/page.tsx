import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import { articles, getArticle } from "@/content/journal";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return a ? { title: a.title, description: a.dek } : {};
}

export default async function Article({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  return (
    <>
      <main id="main" className="px-6 pb-24 pt-32 md:px-12 md:pt-40">
        <p className="text-sm uppercase tracking-widest text-laterite">From the notebook</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-display leading-[0.95]">{a.title}</h1>
        <p className="mt-8 max-w-prose text-xl">{a.dek}</p>
        <div className="mt-12 max-w-prose space-y-6">
          {a.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Link href="/plan" className="mt-12 inline-block rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Plan my journey</Link>
      </main>
      <Footer />
    </>
  );
}
