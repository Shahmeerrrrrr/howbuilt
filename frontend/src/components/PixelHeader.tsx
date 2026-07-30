import React from 'react';
import { Terminal, Tv, Zap } from 'lucide-react';

interface Props {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  scanlines: boolean;
  setScanlines: (s: boolean) => void;
  onReset: () => void;
}

export const PixelHeader: React.FC<Props> = ({
  scanlines,
  setScanlines,
  onReset
}) => {
  return (
    <header className="border-b border-zinc-800/80 pb-4 mb-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onReset}
        >
          <div className="bg-white text-black p-2 rounded-lg font-mono font-bold flex items-center justify-center group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2 text-white">
              HOWBUILT <span className="text-[10px] px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400 font-mono">v1.0</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Paste any website. Instantly understand how it was built.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScanlines(!scanlines)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 cursor-pointer hover:bg-zinc-800 transition ${scanlines ? 'opacity-100' : 'opacity-60'}`}
            title="Toggle CRT Scanlines"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="font-mono">CRT: {scanlines ? 'ON' : 'OFF'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 font-mono">
            <Zap className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>10 DETECTORS READY</span>
          </div>
        </div>
      </div>
    </header>
  );
};
