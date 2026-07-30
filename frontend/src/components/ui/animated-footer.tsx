"use client"
import React, { useEffect, useRef, useState } from "react";

interface LinkItem {
  href: string;
  label: string;
}

interface FooterProps {
  leftLinks: LinkItem[];
  rightLinks: LinkItem[];
  copyrightText: string;
  barCount?: number;
}

const AnimatedFooter: React.FC<FooterProps> = ({
  leftLinks,
  rightLinks,
  copyrightText,
  barCount = 23,
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  useEffect(() => {
    let t = 0;
    const animateWave = () => {
      const waveElements = waveRefs.current;
      let offset = 0;
      waveElements.forEach((element, index) => {
        if (element) {
          offset += Math.max(0, 20 * Math.sin((t + index) * 0.3));
          element.style.transform = `translateY(${index + offset}px)`;
        }
      });
      t += 0.1;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };
    if (isVisible) {
      animateWave();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative flex flex-col w-full h-full justify-between select-none border-t border-white/[0.06]"
    >
      <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row justify-between gap-6 pb-20 pt-10 px-6 md:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <span className="text-black text-[10px] font-bold font-mono">{'>'}_</span>
            </div>
            <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Geist Pixel', monospace" }}>HOWBUILT</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
            Paste any website. Instantly understand how it was built. 10 parallel detectors, 5 seconds flat.
          </p>
          <ul className="flex flex-wrap gap-4 pt-2">
            {leftLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-xs text-zinc-500 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-600 flex items-center gap-1.5 pt-1">
            <svg className="size-3" viewBox="0 0 80 80">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M67.4307 11.5693C52.005 -3.85643 26.995 -3.85643 11.5693 11.5693C-3.85643 26.995 -3.85643 52.005 11.5693 67.4307C26.995 82.8564 52.005 82.8564 67.4307 67.4307C82.8564 52.005 82.8564 26.995 67.4307 11.5693ZM17.9332 17.9332C29.8442 6.02225 49.1558 6.02225 61.0668 17.9332C72.9777 29.8442 72.9777 49.1558 61.0668 61.0668C59.7316 62.4019 58.3035 63.5874 56.8032 64.6232L56.8241 64.6023C46.8657 54.6439 46.8657 38.4982 56.8241 28.5398L58.2383 27.1256L51.8744 20.7617L50.4602 22.1759C40.5018 32.1343 24.3561 32.1343 14.3977 22.1759L14.3768 22.1968C15.4126 20.6965 16.5981 19.2684 17.9332 17.9332ZM34.0282 38.6078C25.6372 38.9948 17.1318 36.3344 10.3131 30.6265C7.56889 39.6809 9.12599 49.76 14.9844 57.6517L34.0282 38.6078ZM21.3483 64.0156C29.24 69.874 39.3191 71.4311 48.3735 68.6869C42.6656 61.8682 40.0052 53.3628 40.3922 44.9718L21.3483 64.0156Z"
              />
            </svg>
            {copyrightText}
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-[11px] text-zinc-600 uppercase tracking-widest mb-3">Connect</div>
          <ul className="flex flex-col gap-2.5">
            {rightLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-zinc-600 hover:text-white transition-colors flex items-center gap-1"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" style={{ overflow: "hidden", height: 160 }}>
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { waveRefs.current[index] = el; }}
              style={{
                height: `${index + 1}px`,
                backgroundColor: "rgb(255, 255, 255)",
                transition: "transform 0.1s ease",
                willChange: "transform",
                marginTop: "-2px",
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default AnimatedFooter;
