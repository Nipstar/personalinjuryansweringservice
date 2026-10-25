import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PaperTexture } from "@/components/PaperTexture";
import { pageMeta } from "@/data/pages";

export const metadata: Metadata = pageMeta("/");

// Placeholder: the site agent replaces this page.
export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <PaperTexture />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 md:px-8 py-24 max-w-[800px] mx-auto w-full">
          <h1 className="text-[40px] font-semibold font-serif">Feeder site</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}
