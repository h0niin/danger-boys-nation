import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danger Boys Induction — NITC B25 CSE" },
      { name: "description", content: "Request induction into Danger Boys, exclusively for NITC B25 CSE students." },
      { property: "og:title", content: "Danger Boys Induction — NITC B25 CSE" },
      { property: "og:description", content: "The induction signal is open exclusively for NITC B25 CSE students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DangerBoys,
});

const ticker = ["B25 CSE ONLY", "NITC", "SIGNAL OPEN", "ONE BATCH", "DANGER BOYS"];

const stages = [
  ["01", "SIGNAL", "Register your interest. One person, one signal."],
  ["02", "CHECK", "Confirm you are from NITC's B25 CSE batch."],
  ["03", "PROOF", "A short sit-down. We want how you think, not a script."],
  ["04", "ON AIR", "Make the cut. Enter the frequency."],
];

function DangerBoys() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-body text-paper antialiased selection:bg-danger selection:text-ink">
      <header className="relative z-20 border-b-2 border-danger/70">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 text-[10px] sm:px-8 sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="signal-pulse size-2 shrink-0 bg-danger" aria-hidden="true" />
            <span className="font-semibold tracking-[0.25em]">NITC /// INDUCTION</span>
          </div>
          <span className="hidden font-medium tracking-[0.25em] text-paper/50 sm:block">SIGNAL OPEN — LIVE</span>
          <span className="font-semibold tracking-[0.2em] text-danger sm:tracking-[0.25em]">BROADCAST B25-CSE</span>
        </div>
      </header>

      <section className="relative" aria-labelledby="danger-title">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true">
            <span className="absolute inset-y-0 left-0 w-px bg-paper" />
            <span className="absolute inset-y-0 right-0 w-px bg-paper" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-paper" />
            <span className="absolute inset-x-0 top-1/3 h-px bg-paper" />
            <span className="absolute inset-x-0 top-2/3 h-px bg-paper" />
          </div>
          <div className="pointer-events-none absolute -right-40 top-1/4 h-24 w-[150%] -rotate-[14deg] bg-danger/85 mix-blend-screen" aria-hidden="true" />
          <div className="danger-scan pointer-events-none absolute" aria-hidden="true" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-danger" />
              <span className="text-[10px] font-medium tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]">TRANSMISSION 001 — NO REPEAT</span>
            </div>
            <h1 id="danger-title" className="mt-5 text-balance font-display text-[26vw] leading-none text-paper sm:mt-6 sm:text-[18vw] lg:text-[13rem] xl:text-[15rem]">
              DANGER<span className="text-danger"> BOYS</span>
            </h1>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 sm:mt-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="clip-stamp inline-block bg-danger px-6 py-5 text-ink">
                  <p className="text-[10px] font-semibold tracking-[0.3em] opacity-80 sm:text-xs">ELIGIBILITY LOCKED</p>
                  <p className="mt-1 font-display text-4xl sm:text-5xl">B25 · CSE</p>
                  <p className="mt-1 text-xs font-medium tracking-wide sm:text-sm">NITC — COMPUTER SCIENCE</p>
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="max-w-[36ch] text-pretty text-sm text-paper/70 sm:text-base">A brotherhood run like a broadcast: loud, brief, and never out of signal. One batch. One frequency.</p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <a href="#join" className="group inline-flex items-center bg-danger px-6 py-3 text-sm font-semibold tracking-wide text-ink ring-1 ring-danger ring-inset transition-colors hover:bg-paper">
                    REQUEST INDUCTION <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#manifesto" className="inline-flex items-center gap-2 text-sm font-medium text-paper/70 transition-colors hover:text-paper">
                    <span className="size-2 border border-paper/50" /> Read the manifesto ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-y-2 border-danger bg-danger text-ink">
          <div className="danger-marquee flex w-max whitespace-nowrap will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center py-3 font-display text-2xl sm:text-3xl" aria-hidden={copy === 1}>
                {ticker.map((item) => <span key={item} className="px-6">{item} <span className="ml-8">◆</span></span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="manifesto" className="relative scroll-mt-4">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// THE MANIFESTO</p>
              <h2 className="mt-3 font-display text-5xl leading-tight text-paper">WE DON'T<br />APOLOGIZE.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
              <article className="border-2 border-paper/15 bg-panel p-6">
                <p className="font-display text-2xl text-danger">01</p>
                <h3 className="mt-2 text-lg font-semibold">Earn the frequency</h3>
                <p className="mt-2 text-pretty text-sm text-paper/60">You get in by showing up when it's loud and staying when it's quiet. Curiosity and conviction beat posturing.</p>
              </article>
              <article className="border-2 border-paper/15 bg-panel p-6 sm:translate-y-8">
                <p className="font-display text-2xl text-danger">02</p>
                <h3 className="mt-2 text-lg font-semibold">Brotherhood, not badge</h3>
                <p className="mt-2 text-pretty text-sm text-paper/60">We back each other and build together. No cruelty, no hazing, no empty status games.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y-2 border-danger/40 bg-panel" aria-labelledby="sequence-title">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="sequence-title" className="text-[11px] font-semibold tracking-[0.3em] text-danger">// HOW YOU GET IN</h2>
            <p className="hidden text-[11px] font-medium tracking-[0.3em] text-paper/40 sm:block">4 STAGES — ONE GATE</p>
          </div>
          <div className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map(([number, title, text], index) => (
              <article key={number} className="group bg-panel p-6 transition-colors hover:bg-ink">
                <p className="text-[11px] font-medium tracking-[0.25em] text-paper/40">STAGE {number}</p>
                <h3 className={`mt-3 font-display text-5xl ${index === 0 || index === 3 ? "text-danger" : "text-paper"}`}>{title}</h3>
                <p className="mt-3 text-pretty text-sm text-paper/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="relative overflow-hidden scroll-mt-4">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-16 -left-24 h-[300px] w-[300px] -rotate-[20deg] bg-danger/25" aria-hidden="true" />
            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// FINAL TRANSMISSION</p>
              <h2 className="mt-4 font-display text-6xl leading-none text-paper sm:text-7xl lg:text-8xl">YOU'RE<br />ONE CALL<br />OUT.</h2>
              <p className="mt-6 max-w-[38ch] text-pretty text-sm text-paper/70 sm:text-base">B25 CSE. NITC. When the signal drops, the door shuts. Make the call before the broadcast ends.</p>
              <a href="mailto:dangerboys@nitc.ac.in?subject=Danger%20Boys%20B25%20CSE%20Induction" className="mt-8 inline-flex items-center bg-paper px-7 py-4 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-danger">
                JOIN DANGER BOYS <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-danger/40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-8 text-[11px] font-medium tracking-[0.2em] text-paper/40 sm:flex-row sm:items-center sm:px-8">
          <p>DANGER BOYS — NITC /// B25 CSE</p>
          <p className="text-danger/80">SIGNAL TERMINATED — NO REPEAT</p>
        </div>
      </footer>
    </main>
  );
}