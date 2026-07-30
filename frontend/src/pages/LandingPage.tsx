import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/lib/auth';
import { FeaturesGrid } from '@/components/ui/featuresgrid';
import AnimatedFooter from '@/components/ui/animated-footer';
import { ArrowRight, Zap, LogOut } from 'lucide-react';

interface LandingPageProps {
  user: User | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ user, onOpenAuth, onSignOut }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black text-[11px] font-bold font-mono">{'>'}_</span>
          </div>
          <span
            className="text-white font-bold text-sm tracking-wide"
            style={{ fontFamily: "'Geist Pixel', monospace" }}
          >
            HOWBUILT
          </span>
          <span className="text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 font-mono">v1.0</span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                {user.name || user.email}
              </span>
              <Link
                to="/app"
                className="text-xs bg-white text-black font-bold font-mono px-4 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Launch App →
              </Link>
              <button
                onClick={onSignOut}
                className="text-xs text-zinc-400 hover:text-white transition-colors font-mono p-1"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                className="text-xs text-zinc-400 hover:text-white transition-colors font-mono px-3 py-1.5"
              >
                Sign in
              </button>
              <button
                onClick={onOpenAuth}
                className="text-xs bg-white text-black font-bold font-mono px-4 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Get Started →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-4 py-1.5 text-[11px] text-zinc-400 font-mono">
          <Zap className="h-3 w-3 text-emerald-400" />
          10 detectors · 5 seconds · no DevTools
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white mb-6 max-w-4xl"
          style={{ fontFamily: "'Geist Pixel', monospace" }}
        >
          Paste any website.
          <br />
          <span className="text-zinc-500">See how it's built.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
          Framework, hosting, CDN, fonts, analytics, auth providers — revealed instantly. No browser extension. No DevTools.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {user ? (
            <Link
              to="/app"
              className="inline-flex items-center gap-2 bg-white text-black font-bold font-mono text-sm px-7 py-3 rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 bg-white text-black font-bold font-mono text-sm px-7 py-3 rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
              >
                Start Detecting Free
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 border border-white/[0.15] text-zinc-300 font-mono text-sm px-7 py-3 rounded-xl hover:border-white/[0.30] hover:text-white transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Social proof strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-zinc-600 font-mono">
          {['stripe.com', 'vercel.com', 'linear.app', 'openai.com', 'supabase.com'].map(site => (
            <span key={site} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {site}
            </span>
          ))}
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <FeaturesGrid />

      {/* ── Footer ── */}
      <AnimatedFooter
        leftLinks={[
          { href: '/app', label: 'Launch App' },
          { href: '#', label: 'Terms' },
          { href: '#', label: 'Privacy' },
        ]}
        rightLinks={[
          { href: 'https://linkedin.com/in/shahmeerraheel', label: 'LinkedIn' },
          { href: 'https://x.com/shahmeerraheel', label: 'X (Twitter)' },
          { href: 'https://github.com/shahmeerraheel', label: 'GitHub' },
        ]}
        copyrightText="HowBuilt 2025. All Rights Reserved."
        barCount={23}
      />
    </div>
  );
};
