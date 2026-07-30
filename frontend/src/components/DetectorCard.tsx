import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, CheckCircle, Info, ShieldAlert, Cpu } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: string;
  confidence: number;
  evidence: string[];
  description: string;
  website?: string;
}

interface Props {
  label: string;
  techs: TechItem[];
  accentColor?: string;
}

export const DetectorCard: React.FC<Props> = ({ label, techs }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative bg-zinc-950/90 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Subtle top glow strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <h3
              className="text-sm font-bold text-white tracking-wide uppercase"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              {label}
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
            {techs.length} {techs.length === 1 ? 'DETECTED' : 'DETECTED'}
          </span>
        </div>

        {/* Tech List */}
        {techs.length === 0 ? (
          <div className="py-6 text-center rounded-xl bg-zinc-900/30 border border-dashed border-zinc-800/60 text-zinc-500 text-xs font-mono">
            None detected
          </div>
        ) : (
          <div className="space-y-4">
            {techs.map((tech, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 hover:border-zinc-700 transition-all"
              >
                {/* Tech Title & Confidence Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors"
                      style={{ fontFamily: "'Geist Pixel', monospace" }}
                    >
                      {tech.name}
                    </span>
                    {tech.website && (
                      <a
                        href={tech.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        title={`Visit ${tech.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Confidence Badge & Bar */}
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        style={{ width: `${tech.confidence}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {tech.confidence}% CONFIDENCE
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-1">
                  {tech.description}
                </p>

                {/* Evidence Accordion Panel */}
                {expanded && tech.evidence.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>EVIDENCE SIGNATURES:</span>
                    </div>
                    <ul className="space-y-1 pl-4 list-disc text-zinc-400">
                      {tech.evidence.map((ev, eIdx) => (
                        <li key={eIdx}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expand Evidence Button */}
      {techs.length > 0 && techs.some(t => t.evidence.length > 0) && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 w-full transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>{expanded ? 'HIDE DETECTOR EVIDENCE' : 'VIEW DETECTOR EVIDENCE'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};
