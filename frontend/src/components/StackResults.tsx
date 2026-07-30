import React, { useState } from 'react';
import { DetectorCard } from './DetectorCard';
import { AiExplainer } from './AiExplainer';
import { ShieldCheck, Gauge, Cookie, LayoutGrid, FileText, Copy, Check, Sparkles } from 'lucide-react';

interface Props {
  data: any;
}

export const StackResults: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'raw'>('cards');

  const {
    domain,
    categories,
    security,
    performance,
    aiAnalysis
  } = data;

  // Format clean text view matching user spec
  const generateRawTextReport = () => {
    let report = `HOWBUILT TECH STACK REPORT: ${domain}\n========================================\n\n`;

    const cats = [
      { key: 'framework', label: 'Framework' },
      { key: 'hosting', label: 'Hosting & CDN' },
      { key: 'css', label: 'CSS / Styling' },
      { key: 'fonts', label: 'Fonts' },
      { key: 'analytics', label: 'Analytics' },
      { key: 'payments', label: 'Payments' },
      { key: 'auth', label: 'Authentication' },
      { key: 'images', label: 'Images & Media' },
      { key: 'cms', label: 'CMS' }
    ];

    cats.forEach(c => {
      const items = categories[c.key]?.techs || [];
      const name = items.length > 0 ? items.map((i: any) => `${i.name} (${i.confidence}% confidence)`).join('\n') : 'None detected';
      report += `${c.label}\n────────────\n${name}\n\n`;
    });

    report += `Security Headers\n────────────\nGRADE: ${security.score}\n\n`;
    report += `Cookies Set\n────────────\n${security.cookiesCount} ACTIVE\n\n`;
    report += `Performance Score\n────────────\n${performance.score} / 100\n\n`;

    if (aiAnalysis) {
      report += `AI Breakdown\n────────────\n"${aiAnalysis.stackSummary}"\n`;
    }

    return report;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateRawTextReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 animate-fadeIn">
      {/* ── Header Bar with domain & controls ── */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ANALYSIS COMPLETE FOR</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase"
            style={{ fontFamily: "'Geist Pixel', monospace" }}
          >
            {domain}
          </h2>
        </div>

        {/* View Mode & Copy Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setViewMode(viewMode === 'cards' ? 'raw' : 'cards')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs transition-all"
          >
            {viewMode === 'cards' ? <FileText className="w-4 h-4 text-cyan-400" /> : <LayoutGrid className="w-4 h-4 text-cyan-400" />}
            <span>{viewMode === 'cards' ? 'TEXT VIEW' : 'CARDS VIEW'}</span>
          </button>

          <button
            onClick={handleCopyReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold font-mono text-xs transition-all shadow-lg"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED!' : 'COPY REPORT'}</span>
          </button>
        </div>
      </div>

      {/* ── Metrics Cards Ribbon ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Security Grade */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">SECURITY HEADERS</div>
            <div
              className="text-lg font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              GRADE: <span className="text-emerald-400">{security.score}</span>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">COOKIES SET</div>
            <div
              className="text-lg font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              <span className="text-amber-400">{security.cookiesCount}</span> ACTIVE
            </div>
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">PERFORMANCE SCORE</div>
            <div
              className="text-lg font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              <span className="text-cyan-400">{performance.score}</span> / 100
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Explainer Banner ── */}
      {aiAnalysis && <AiExplainer analysis={aiAnalysis} domain={domain} />}

      {/* ── Grid vs Raw Spec View ── */}
      {viewMode === 'raw' ? (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          <pre className="font-mono text-xs sm:text-sm leading-relaxed text-emerald-400 whitespace-pre-wrap overflow-x-auto">
            {generateRawTextReport()}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <DetectorCard label="Framework" techs={categories.framework?.techs || []} />
          <DetectorCard label="Hosting & CDN" techs={categories.hosting?.techs || []} />
          <DetectorCard label="CSS / Styling" techs={categories.css?.techs || []} />
          <DetectorCard label="Fonts" techs={categories.fonts?.techs || []} />
          <DetectorCard label="Analytics" techs={categories.analytics?.techs || []} />
          <DetectorCard label="Payments" techs={categories.payments?.techs || []} />
          <DetectorCard label="Authentication" techs={categories.auth?.techs || []} />
          <DetectorCard label="Images & Media" techs={categories.images?.techs || []} />
          <DetectorCard label="CMS" techs={categories.cms?.techs || []} />
        </div>
      )}
    </div>
  );
};
