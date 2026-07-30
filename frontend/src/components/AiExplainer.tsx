import React from 'react';
import { Bot, Sparkles, CheckCircle2, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';

interface AIAnalysis {
  stackSummary: string;
  archetype: string;
  architecturalPros: string[];
  architecturalCons: string[];
  recommendedAlternatives: {
    useCase: string;
    stack: string;
    rationale: string;
  }[];
  developerTip: string;
}

interface Props {
  analysis: AIAnalysis;
  domain: string;
}

export const AiExplainer: React.FC<Props> = ({ analysis, domain }) => {
  return (
    <div className="relative bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl mb-8 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-5 border-b border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2
              className="text-base font-bold text-white tracking-wide uppercase flex items-center gap-2"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              AI ARCHITECTURE SYNTHESIZER
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono">
              Deep tech stack summary & architectural evaluation
            </p>
          </div>
        </div>

        {/* Archetype Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>ARCHETYPE: {analysis.archetype.toUpperCase()}</span>
        </div>
      </div>

      {/* Summary Quote Box */}
      <div className="relative p-4 rounded-xl bg-zinc-900/80 border-l-4 border-emerald-400 border-t border-r border-b border-zinc-800/80 mb-6 font-mono text-sm leading-relaxed text-zinc-200">
        <div className="text-[11px] text-emerald-400 font-bold mb-1 flex items-center gap-1.5 uppercase tracking-wider">
          <span>AI Breakdown for {domain}:</span>
        </div>
        <p className="font-sans text-sm text-zinc-100 font-medium">
          "{analysis.stackSummary}"
        </p>
      </div>

      {/* Architectural Pros & Cons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Advantages */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
          <h4
            className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wider"
            style={{ fontFamily: "'Geist Pixel', monospace" }}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ARCHITECTURAL ADVANTAGES</span>
          </h4>
          <ul className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
            {analysis.architecturalPros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trade-offs */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
          <h4
            className="text-xs font-bold text-amber-400 mb-3 flex items-center gap-2 uppercase tracking-wider"
            style={{ fontFamily: "'Geist Pixel', monospace" }}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>TRADE-OFFS & CONSIDERATIONS</span>
          </h4>
          <ul className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
            {analysis.architecturalCons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Architecture section */}
      <div className="pt-5 border-t border-dashed border-zinc-800/80 mb-5">
        <h4
          className="text-xs font-bold text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-wider"
          style={{ fontFamily: "'Geist Pixel', monospace" }}
        >
          <ArrowRight className="w-4 h-4 text-cyan-400" />
          <span>RECOMMENDED ARCHITECTURAL ALTERNATIVES</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.recommendedAlternatives.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold mb-1">
                USE CASE: {item.useCase}
              </div>
              <div
                className="text-sm font-bold text-white mb-1"
                style={{ fontFamily: "'Geist Pixel', monospace" }}
              >
                {item.stack}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {item.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Developer Tip Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs font-mono text-emerald-300">
        <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div>
          <span className="font-bold text-white uppercase mr-2">Pro Tip:</span>
          {analysis.developerTip}
        </div>
      </div>
    </div>
  );
};
