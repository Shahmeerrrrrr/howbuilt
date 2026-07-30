import React, { useState } from 'react';
import { TextureButton } from '@/components/ui/texture-button';
import { Search, Clipboard, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  onScan: (url: string) => void;
  loading: boolean;
}

const SAMPLE_SITES = [
  { name: 'stripe.com', label: 'Stripe' },
  { name: 'vercel.com', label: 'Vercel' },
  { name: 'linear.app', label: 'Linear' },
  { name: 'openai.com', label: 'OpenAI' },
  { name: 'supabase.com', label: 'Supabase' },
  { name: 'tailwindcss.com', label: 'Tailwind' },
  { name: 'github.com', label: 'GitHub' }
];

export const UrlSearch: React.FC<Props> = ({ onScan, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        onScan(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  return (
    <div className="my-6 max-w-xl mx-auto w-full z-10 relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-white text-white pl-4 pr-20 py-3 text-sm rounded-lg outline-none font-mono placeholder:text-zinc-500 transition shadow-inner"
              placeholder="https://stripe.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1 text-[11px] px-2.5 py-1 rounded border border-zinc-700 font-mono transition"
              title="Paste from Clipboard"
            >
              <Clipboard size={12} />
              <span>PASTE</span>
            </button>
          </div>

          <div className="w-full sm:w-44 shrink-0">
            <TextureButton
              variant="primary"
              size="default"
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full py-3"
            >
              {loading ? (
                <>
                  <Sparkles size={14} className="animate-spin text-emerald-400" />
                  <span className="font-mono text-xs font-bold">SCANNING...</span>
                </>
              ) : (
                <>
                  <span className="font-mono text-xs font-bold">ANALYZE TECH</span>
                  <ArrowRight size={14} />
                </>
              )}
            </TextureButton>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] text-zinc-500 font-mono mr-1">
            TRY:
          </span>
          {SAMPLE_SITES.map((site) => (
            <button
              key={site.name}
              type="button"
              onClick={() => {
                setUrl(`https://${site.name}`);
                onScan(`https://${site.name}`);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-md text-xs text-zinc-300 hover:text-white transition cursor-pointer font-mono"
            >
              <Search size={11} className="text-zinc-500" />
              <span>{site.label}</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};
