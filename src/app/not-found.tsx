import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PaperTexture } from '@/components/PaperTexture';

export const metadata: Metadata = { title: { absolute: 'Page not found | Call Della' }, robots: { index: false } };

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <PaperTexture />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 md:px-8 py-24 max-w-[800px] mx-auto w-full">
          <h1 className="text-[40px] font-semibold font-serif tracking-[-0.02em] m-0">This page isn&apos;t on file</h1>
          <p className="font-serif text-[18px] leading-[1.6] mt-6">
            The address may have changed. Start from the <a href="/" className="underline underline-offset-4">personal injury answering service</a> page,
            or see <a href="/pricing" className="underline underline-offset-4">pricing</a>.
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
}
