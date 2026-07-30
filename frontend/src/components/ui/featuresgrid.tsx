import { cn } from "@/lib/utils";
import { Terminal, Database, Network, ShieldCheck } from "lucide-react";

export const FeaturesGrid = () => {
  return (
    <section className="relative w-full py-20 text-white">
      <div className="mx-auto max-w-5xl px-6 md:px-8">

        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-zinc-400">
            What We Detect
          </div>
          <h2 className="mb-4 max-w-2xl text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl" style={{ fontFamily: "'Geist Pixel', monospace" }}>
            10 parallel detectors.<br className="hidden sm:block" />
            <span className="text-zinc-600">5 seconds flat.</span>
          </h2>
          <p className="max-w-xl text-balance text-sm text-zinc-400 sm:text-base">
            Drop any URL. HowBuilt scans headers, scripts, DNS, and HTML signatures to reveal the exact tech stack — no DevTools required.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">

          {/* Card 1: Large — Framework Detection */}
          <div className="group flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505] transition-colors hover:border-white/[0.15] md:col-span-2">
            <div className="relative flex flex-1 items-center justify-center p-8">
              <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/[0.08] bg-black font-mono text-[11px] leading-relaxed text-zinc-500">
                <div className="flex border-b border-white/[0.08] px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                    <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                    <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <span className="text-white">scan --target stripe.com</span>
                    <span>[OK]</span>
                  </div>
                  <div className="mt-2 flex justify-between text-zinc-400">
                    <span>framework detected...</span>
                    <span className="text-emerald-400">Next.js</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>hosting detected...</span>
                    <span className="text-emerald-400">Vercel</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>css detected...</span>
                    <span className="text-emerald-400">Tailwind CSS</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-white">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    10 detectors complete (4.8s)
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] bg-white/[0.01] p-5">
              <div className="mb-1.5 flex items-center gap-2 text-white">
                <Terminal className="h-4 w-4" />
                <h3 className="text-sm font-medium" style={{ fontFamily: "'Geist Pixel', monospace" }}>Framework + Stack Detection</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Detects Next.js, Nuxt, Astro, Remix, SvelteKit, Gatsby and more via script signatures and meta tags.
              </p>
            </div>
          </div>

          {/* Card 2: Small — Database / CDN */}
          <div className="group flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505] transition-colors hover:border-white/[0.15]">
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="flex flex-col gap-2 w-full">
                {['Cloudflare', 'Vercel CDN', 'Fastly'].map((item, i) => (
                  <div key={i} className="flex h-9 w-full items-center justify-between rounded border border-white/[0.04] bg-white/[0.02] px-3 font-mono text-[11px]">
                    <span className="text-zinc-400">{item}</span>
                    <span className="text-emerald-400 text-[10px]">DETECTED</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/[0.04] bg-white/[0.01] p-5">
              <div className="mb-1.5 flex items-center gap-2 text-white">
                <Database className="h-4 w-4" />
                <h3 className="text-sm font-medium" style={{ fontFamily: "'Geist Pixel', monospace" }}>Hosting & CDN</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Identifies infrastructure from response headers and IP ranges.
              </p>
            </div>
          </div>

          {/* Card 3: Small — Security Headers */}
          <div className="group flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505] transition-colors hover:border-white/[0.15]">
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="w-full max-w-[200px] font-mono text-[10px] leading-relaxed text-zinc-600">
                <div className="text-zinc-300 mb-2 text-[11px]">Security Score</div>
                <div className="text-5xl font-bold text-emerald-400 mb-2">A+</div>
                <div className="h-px w-full bg-white/[0.08] my-2" />
                <div className="text-zinc-500">
                  strict-transport-security ✓<br/>
                  content-security-policy ✓<br/>
                  x-frame-options ✓
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] bg-white/[0.01] p-5">
              <div className="mb-1.5 flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="text-sm font-medium" style={{ fontFamily: "'Geist Pixel', monospace" }}>Security Headers</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Audits HTTP security headers and scores your target site.
              </p>
            </div>
          </div>

          {/* Card 4: Large — AI Architecture */}
          <div className="group flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505] transition-colors hover:border-white/[0.15] md:col-span-2">
            <div className="relative flex flex-1 items-center justify-center p-8">
              <div className="flex w-full max-w-sm flex-col gap-3 font-mono text-xs">
                <div className="text-zinc-500 text-[11px] uppercase tracking-wider">AI Architecture Synthesizer</div>
                <div className="rounded border border-white/[0.08] bg-black p-4 text-zinc-300 leading-relaxed text-[11px]">
                  "This looks like a cutting-edge{" "}
                  <span className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2">Jamstack SaaS</span>
                  {" "}architecture.{" "}
                  <span className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2">Next.js App Router</span>
                  {" "}+{" "}
                  <span className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2">Vercel Edge</span>
                  {" "}+{" "}
                  <span className="text-emerald-400 underline decoration-emerald-400/50 underline-offset-2">Tailwind CSS</span>."
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Archetype: Edge-First Full Stack SaaS
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.04] bg-white/[0.01] p-5">
              <div className="mb-1.5 flex items-center gap-2 text-white">
                <Network className="h-4 w-4" />
                <h3 className="text-sm font-medium" style={{ fontFamily: "'Geist Pixel', monospace" }}>AI Architecture Synthesis</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Synthesizes all detected signals into a plain-English architecture breakdown with pros, cons, and alternatives.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
