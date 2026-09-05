import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import abdullaImg from "../assets/images/abdul.jpg";
import adithImg from "../assets/images/adhti.jpg";
import ashImg from "../assets/images/ash.jpg";
import dangerSkull from "../assets/danger-skull.png";
import devanandImg from "../assets/images/devanand.webp";
import gothamImg from "../assets/images/gothm.jpeg";
import joelImg from "../assets/images/jole.JPG";
import najadImg from "../assets/images/naja.jpg";
import naseefImg from "../assets/images/nas33f.jpg";
import pranavImg from "../assets/images/pranav.jpg";
import rabeeathImg from "../assets/images/rabee.jpg";
import sanadImg from "../assets/images/sefuxxxtentacion.jpg";
import shabasImg from "../assets/images/shabs.JPG";
import shamirImg from "../assets/images/shamir.jpeg";
import souravImg from "../assets/images/srv.jpg";
import yadhuImg from "../assets/images/yaadu.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danger Boys Induction —  B25 CSE" },
      { name: "description", content: "Request induction into Danger Boys, exclusively for B25 CSE students." },
      { property: "og:title", content: "Danger Boys Induction —  B25 CSE" },
      { property: "og:description", content: "The induction signal is open exclusively for B25 CSE students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DangerBoys,
});

const INDUCTION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf__ybMitK4ba0mQUaQncMFdPIBu2ExMoVM4X5LmUVcUYq75A/viewform?usp=publish-editor";

const ticker = ["B25 CSE ONLY", "FOLLOW US", "@kattan.kathakal", "ONE BATCH", "DANGER BOYS"];

const founders = [
  { number: "01", name: "ABDULLA", image: abdullaImg, position: "object-[50%_28%]", scale: 1.25 },
  { number: "02", name: "ADITH", image: adithImg, position: "object-[50%_34%]", scale: 1.2 },
  { number: "03", name: "ASH", image: ashImg, position: "object-[50%_25%]", scale: 1.2 },
  { number: "04", name: "DEVANAND", image: devanandImg, position: "object-[50%_28%]", scale: 1.2 },
  { number: "05", name: "GOTHAM", image: gothamImg, position: "object-[50%_35%]", scale: 1.25 },
  { number: "06", name: "JOEL", image: joelImg, position: "object-[50%_40%]", scale: 1.25 },
  { number: "07", name: "NAJAD", image: najadImg, position: "object-[50%_25%]", scale: 1.15 },
  { number: "08", name: "NASEEF", image: naseefImg, position: "object-[50%_35%]", scale: 1.2 },
  { number: "09", name: "PRANAV", image: pranavImg, position: "object-[50%_40%]", scale: 1.25 },
  { number: "10", name: "RABEEATH", image: rabeeathImg, position: "object-[50%_18%]", scale: 1.85 },
  { number: "11", name: "SANAD", image: sanadImg, position: "object-[50%_35%]", scale: 1.2 },
  { number: "12", name: "SHABAS", image: shabasImg, position: "object-[50%_36%]", scale: 1.2 },
  { number: "13", name: "SHAMIR", image: shamirImg, position: "object-[56%_35%]", scale: 1.2 },
  { number: "14", name: "SOURAV", image: souravImg, position: "object-[50%_30%]", scale: 1.2 },
  { number: "15", name: "YADHU", image: yadhuImg, position: "object-[50%_16%]", scale: 1.85 },
];

function DangerBoys() {
  const [litFounders, setLitFounders] = useState<Record<string, boolean>>({});

  const toggleFounder = (num: string) => {
    setLitFounders((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const allLit = founders.every((f) => litFounders[f.number]);
  const toggleAllFounders = () => {
    if (allLit) {
      setLitFounders({});
    } else {
      const next: Record<string, boolean> = {};
      founders.forEach((f) => {
        next[f.number] = true;
      });
      setLitFounders(next);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-body text-paper antialiased selection:bg-danger selection:text-ink">
      <header className="relative z-20 border-b-2 border-danger/70">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 text-[10px] sm:px-8 sm:text-xs">
          <div className="flex items-center gap-2">
            <img src={dangerSkull} alt="" width={1024} height={1024} className="size-6 object-contain" />
            <span className="signal-pulse size-2 shrink-0 bg-danger" aria-hidden="true" />
            <span className="font-semibold tracking-[0.25em]"> DB /// INDUCTIONS</span>
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
          <img src={dangerSkull} alt="" width={1024} height={1024} className="skull-drift pointer-events-none absolute -right-[14%] top-1/2 w-[72vw] max-w-[950px] -translate-y-1/2 object-contain opacity-[0.13] mix-blend-screen" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-40 top-1/4 h-24 w-[150%] -rotate-[14deg] bg-danger/85 mix-blend-screen" aria-hidden="true" />
          <div className="danger-scan pointer-events-none absolute" aria-hidden="true" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <img src={dangerSkull} alt="" width={1024} height={1024} className="size-8 object-contain" />
              <span className="h-px w-10 bg-danger" />
              <span className="text-[10px] font-medium tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]">TRANSMISSION 001 — NO REPEAT</span>
            </div>
            <h1 id="danger-title" className="mt-5 text-balance font-display text-[26vw] leading-none text-paper sm:mt-6 sm:text-[18vw] lg:text-[13rem] xl:text-[15rem]">
              DANGER<span className="text-danger"> BOYS</span>
            </h1>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 sm:mt-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="clip-stamp inline-block bg-danger px-6 py-5 text-ink">
                  <p className="mt-1 font-display text-4xl sm:text-5xl">B25 · CSE</p>
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="max-w-[36ch] text-pretty text-sm text-paper/70 sm:text-base">A brotherhood run like a broadcast: loud, brief, and never out of signal. One batch. One frequency.</p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <a
                    href="#join"
                    className="group inline-flex items-center bg-danger px-6 py-3 text-sm font-semibold tracking-wide text-ink ring-1 ring-danger ring-inset transition-colors hover:bg-paper"
                  >
                    REQUEST INDUCTION <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#founders" className="inline-flex items-center gap-2 text-sm font-medium text-paper/70 transition-colors hover:text-paper">
                    Founding Members ↓
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
                {ticker.map((item) => (
                  <span key={item} className="flex items-center gap-8 px-6">
                    {item} <img src={dangerSkull} alt="" loading="lazy" width={1024} height={1024} className="size-8 object-contain" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative scroll-mt-4">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// THE MANIFESTO</p>
              <h2 className="mt-3 font-display text-5xl leading-tight text-paper">WE DON'T<br />APOLOGIZE.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
              <article className="border-2 border-paper/15 bg-panel p-6">
                <div className="flex items-center justify-between"><p className="font-display text-2xl text-danger">01</p><img src={dangerSkull} alt="" loading="lazy" width={1024} height={1024} className="size-12 object-contain opacity-70" /></div>
                <h3 className="mt-2 text-lg font-semibold">Earn the frequency</h3>
                <p className="mt-2 text-pretty text-sm text-paper/60">You get in by showing up when it's loud and staying when it's quiet. Curiosity and conviction beat posturing.</p>
              </article>
              <article className="border-2 border-paper/15 bg-panel p-6 sm:translate-y-8">
                <div className="flex items-center justify-between"><p className="font-display text-2xl text-danger">02</p><img src={dangerSkull} alt="" loading="lazy" width={1024} height={1024} className="size-12 object-contain opacity-70" /></div>
                <h3 className="mt-2 text-lg font-semibold">Brotherhood, not badge</h3>
                <p className="mt-2 text-pretty text-sm text-paper/60">We back each other and build together. No cruelty, no hazing, no empty status games.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="founders" className="relative scroll-mt-4 overflow-hidden border-y-2 border-danger/40" aria-labelledby="founders-title">
        <div className="pointer-events-none absolute inset-0 skull-field opacity-[0.035]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-10 grid items-end gap-5 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// ORIGINAL FIFTEEN</p>
              <h2 id="founders-title" className="mt-3 font-display text-6xl leading-none text-paper sm:text-8xl">FOUNDING<br /><span className="text-danger">MEMBERS</span></h2>
            </div>
            <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
              <p className="max-w-[34ch] text-sm text-paper/60 md:text-right">The fifteen who found the frequency before there was a signal.</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-paper/60">
                  <span className="signal-pulse size-1.5 bg-danger inline-block" /> TAP TO ILLUMINATE
                </span>
                <button
                  type="button"
                  onClick={toggleAllFounders}
                  className="inline-flex items-center border border-danger/50 bg-ink/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-danger transition-colors hover:bg-danger hover:text-ink cursor-pointer"
                >
                  {allLit ? "DIM ALL" : "IGNITE ALL"}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-danger/40 sm:grid-cols-3">
            {founders.map((founder) => {
              const isLit = Boolean(litFounders[founder.number]);
              return (
                <button
                  type="button"
                  key={founder.number}
                  onClick={() => toggleFounder(founder.number)}
                  aria-pressed={isLit}
                  aria-label={`${founder.name}, founding member ${founder.number}. Click to ${isLit ? "dim" : "illuminate"}`}
                  className={`group relative aspect-[4/5] overflow-hidden bg-panel text-left w-full cursor-pointer select-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger active:scale-[0.98] ${isLit ? "ring-2 ring-danger ring-inset shadow-[0_0_30px_rgba(255,40,40,0.5)] z-10" : ""
                    }`}
                >
                  <div className={`size-full overflow-hidden transition-transform duration-500 ease-out ${isLit ? "scale-105" : "group-hover:scale-105"}`}>
                    <img
                      src={founder.image}
                      alt={`${founder.name}, founding member`}
                      loading="lazy"
                      width={1080}
                      height={1920}
                      className={`size-full object-cover transition-all duration-500 ${founder.position} ${isLit
                        ? "grayscale-0 contrast-105 brightness-110"
                        : "grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105"
                        }`}
                      style={{ transform: `scale(${founder.scale})` }}
                    />
                  </div>
                  <div
                    className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${isLit ? "bg-transparent ring-1 ring-danger/60 ring-inset" : "bg-ink/20 group-hover:bg-transparent"
                      }`}
                  />
                  <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-1.5">
                    <span className={`font-display text-2xl sm:text-3xl transition-colors duration-300 ${isLit ? "text-danger drop-shadow-[0_0_12px_rgba(255,40,40,0.9)]" : "text-danger drop-shadow"
                      }`}>
                      {founder.number}
                    </span>
                    {isLit && (
                      <span className="signal-pulse size-2 bg-danger shadow-[0_0_10px_#ff2020]" aria-hidden="true" />
                    )}
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 border-t transition-colors duration-300 p-3 sm:p-4 backdrop-blur-xs ${isLit ? "border-danger/70 bg-ink/95" : "border-paper/15 bg-ink/90"
                    }`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] transition-colors ${isLit ? "text-danger" : "text-paper/50"
                        }`}>
                        {isLit ? "SIGNAL LOCKED" : "FOUNDING MEMBER"}
                      </p>
                      {isLit && (
                        <span className="text-[9px] font-semibold tracking-widest text-danger">// ACTIVE</span>
                      )}
                    </div>
                    <h3 className="mt-0.5 sm:mt-1 font-display text-lg sm:text-2xl text-paper">{founder.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="join" className="relative overflow-hidden scroll-mt-4">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-16 -left-24 h-[300px] w-[300px] -rotate-[20deg] bg-danger/25" aria-hidden="true" />
            <div className="relative z-10 max-w-xl">
              <img src={dangerSkull} alt="" loading="lazy" width={1024} height={1024} className="mb-5 size-16 object-contain" />
              <p className="text-[11px] font-semibold tracking-[0.3em] text-danger">// FINAL TRANSMISSION</p>
              <h2 className="mt-4 font-display text-6xl leading-none text-paper sm:text-7xl lg:text-8xl">YOU'RE<br />ONE CALL<br />OUT.</h2>
              <p className="mt-6 max-w-[38ch] text-pretty text-sm text-paper/70 sm:text-base">B25 CSE. When the signal drops, the door shuts. Make the call before the broadcast ends.</p>
              <a
                href={INDUCTION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center bg-paper px-7 py-4 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-danger"
              >
                JOIN DANGER BOYS <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-danger/40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 py-8 text-[11px] font-medium tracking-[0.2em] text-paper/40 sm:flex-row sm:items-center sm:px-8">
          <p>DANGER BOYS /// B25 CSE</p>
          <p className="text-danger/80">SIGNAL TERMINATED — NO REPEAT</p>
        </div>
      </footer>
    </main>
  );
}