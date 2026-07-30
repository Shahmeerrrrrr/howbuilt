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
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black text-[10px] sm:text-[11px] font-bold font-mono">{'>'}_</span>
          </div>
          <span
            className="text-white font-bold text-xs sm:text-sm tracking-wide"
            style={{ fontFamily: "'Geist Pixel', monospace" }}
          >
            HOWBUILT
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 font-mono">v1.0</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                {user.name || user.email}
              </span>
              <Link
                to="/app"
                className="text-xs bg-white text-black font-bold font-mono px-3 sm:px-4 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
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
                className="text-xs text-zinc-400 hover:text-white transition-colors font-mono px-2.5 sm:px-3 py-1.5"
              >
                Sign in
              </button>
              <button
                onClick={onOpenAuth}
                className="text-xs bg-white text-black font-bold font-mono px-3 sm:px-4 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Get Started →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        {/* Badge */}
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] text-zinc-400 font-mono">
          <Zap className="h-3 w-3 text-emerald-400" />
          10 detectors · 5 seconds · no DevTools
        </div>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05] text-white mb-6 max-w-4xl"
          style={{ fontFamily: "'Geist Pixel', monospace" }}
        >
          Paste any website.
          <br />
          <span className="text-zinc-500">See how it's built.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-zinc-400 max-w-xl mb-8 sm:mb-10 leading-relaxed px-2">
          Framework, hosting, CDN, fonts, analytics, auth providers — revealed instantly. No browser extension. No DevTools.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto px-4">
          {user ? (
            <Link
              to="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold font-mono text-sm px-7 py-3 rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-bold font-mono text-sm px-7 py-3 rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
              >
                Start Detecting Free
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/[0.15] text-zinc-300 font-mono text-sm px-7 py-3 rounded-xl hover:border-white/[0.30] hover:text-white transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Social proof strip */}
        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-[10px] sm:text-[11px] text-zinc-600 font-mono">
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
          { href: 'https://github.com/Shahmeerrrrrr', label: 'GitHub' },
          { href: 'https://www.linkedin.com/in/shahmeerrrrrr/', label: 'LinkedIn' },
          { href: 'https://x.com/_SHAH_MEER_', label: 'X (Twitter)' },
          { href: 'mailto:shahmeerraheel786@gmail.com', label: 'Email' },
        ]}
        copyrightText="HowBuilt 2025. All Rights Reserved."
        barCount={23}
      />
    </div>
  );
};
