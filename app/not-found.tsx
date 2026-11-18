import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col justify-center px-6 md:px-12">
      <svg viewBox="0 0 400 120" className="mb-10 w-full max-w-md" aria-hidden="true">
        <path d="M5,90 C80,90 120,30 200,40 C260,48 290,80 330,70" fill="none" stroke="#9c3f25" strokeWidth="3" strokeLinecap="round" />
        <circle cx="330" cy="70" r="6" fill="#9c3f25" />
        <path d="M345,60 l16,20 M361,60 l-16,20" stroke="#17130f" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h1 className="font-display text-display leading-[0.95]">This road isn&apos;t on the map.</h1>
      <p className="mt-6 max-w-prose">We looked. The line stops here. Let&apos;s go back to where it starts.</p>
      <Link href="/" className="mt-10 inline-block self-start rounded-sm bg-laterite px-7 py-4 text-bone hover:bg-ink">Back to the start</Link>
    </main>
  );
}
