import { LocationInspector } from "@/components/location-inspector";
import { LocationSearch } from "@/components/location-search";
import ExpertListingLogo from "@/assets/svg/expert-listing-logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell flex min-h-[100svh] flex-col overflow-hidden bg-white text-[#105B48] lg:h-[100svh]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          atlas<span className="text-[#A8DC66]">.</span>
        </Link>
        <span className="text-xs font-bold tracking-[.14em] text-[#71827b]">LOCATION INTELLIGENCE</span>
      </nav>
      <section className="mx-auto grid w-full max-w-7xl flex-1 items-stretch px-6 py-5 sm:px-10 lg:min-h-0 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-6">
        <div className="relative z-10 py-5 lg:self-center lg:py-6">
          <p className="animate-[rise_.5s_ease-out] text-xs font-bold tracking-[.18em] text-[#ef6a4a]">
            THE FIRST OF THREE CLICKS
          </p>
          <h1 className="mt-4 max-w-[36rem] animate-[rise_.6s_ease-out] font-[family-name:var(--font-display)] text-4xl leading-[.95] tracking-[-.045em] sm:text-5xl">
            Find a <em className="font-normal text-[#A8DC66]">location.</em> Make the next click count.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#51665e]">
            A first step inspired by Expert Listing’s promise: better property decisions in three clicks, not
            months. Start with the local context.
          </p>
          <div className="mt-8 max-w-xl">
            <LocationSearch />
            <LocationInspector />
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-t-[9rem] bg-[#105B48] sm:min-h-[540px] lg:h-[360px] lg:min-h-0 lg:self-center lg:rounded-t-[9rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,#5e8971_0%,transparent_30%),radial-gradient(circle_at_78%_72%,#d7f05a_0%,transparent_12%),linear-gradient(140deg,#102d29,#244f43)]" />
          <div className="absolute top-[14%] left-[16%] size-[48%] rounded-full border border-[#d7f05a]/45" />
          <div className="absolute top-[26%] left-[28%] size-[24%] rounded-full bg-[#f4f1e9]/90 shadow-[0_0_0_38px_rgba(244,241,233,.10),0_0_0_78px_rgba(244,241,233,.05)]" />
          <div className="absolute top-[37%] left-[39%] size-3 rounded-full bg-[#ef6a4a] shadow-[0_0_0_10px_rgba(239,106,74,.18)]" />
          <div className="absolute right-[10%] bottom-[13%] left-[10%] border-t border-white/20 pt-4 text-xs font-medium tracking-[.12em] text-white/70">
            A WORLD OF SIGNALS, MADE FINDABLE
          </div>
          <div className="absolute top-7 right-7 grid size-12 place-items-center rounded-full border border-white/30 text-white">
            <span className="size-2 rounded-full bg-[#d7f05a]" />
          </div>
        </div>
      </section>
      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-[#105B48]/10 px-6 py-4 text-xs text-[#105B48]/60 sm:px-10">
        <a
          href="https://www.expertlisting.ng/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Expert Listing"
        >
          <ExpertListingLogo className="block h-6 w-44" />
        </a>
        <span>Open-Meteo Geocoding</span>
      </footer>
    </main>
  );
}
