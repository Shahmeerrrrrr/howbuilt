import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, User as UserType } from '@/lib/auth';
import { WebsiteFrame } from '@/components/WebsiteFrame';
import { PixelHeader } from '@/components/PixelHeader';
import { UrlSearch } from '@/components/UrlSearch';
import { TerminalLogs } from '@/components/TerminalLogs';
import { StackResults } from '@/components/StackResults';
import { LogOut, User } from 'lucide-react';

interface AppPageProps {
  user: UserType;
  onSignOut: () => void;
}

export const AppPage: React.FC<AppPageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scanlines, setScanlines] = useState(true);
  const [loading, setLoading] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleScan = async (url: string) => {
    setLoading(true);
    setTargetUrl(url);
    setError(null);
    setResult(null);

    try {
      const token = getToken();
      const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Server returned HTTP ${response.status}`);
      const data = await response.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze website');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setTargetUrl('');
  };

  const handleSignOut = () => {
    onSignOut();
    navigate('/');
  };

  return (
    <WebsiteFrame>
      {scanlines && <div className="scanlines-overlay" />}

      <PixelHeader
        theme={theme}
        setTheme={setTheme}
        scanlines={scanlines}
        setScanlines={setScanlines}
        onReset={handleReset}
      />

      {/* User bar */}
      {user && (
        <div className="flex items-center justify-between px-1 py-1.5 mb-3 border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-3 h-3 text-zinc-400" />
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">
              {user.name} ({user.email})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors font-mono"
            >
              ← Home
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-white transition-colors font-mono border border-zinc-800 px-2 py-0.5 rounded"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </div>
        </div>
      )}

      <main className="w-full flex-1 relative z-10">
        {/* Idle hero text when nothing is running */}
        {!result && !loading && (
          <div className="text-center pt-8 pb-4">
            <h1
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "'Geist Pixel', monospace" }}
            >
              Paste any website.
            </h1>
            <p className="text-sm text-zinc-500">Instantly understand how it was built.</p>
          </div>
        )}

        <UrlSearch onScan={handleScan} loading={loading} />

        {loading && <TerminalLogs targetUrl={targetUrl} />}

        {error && (
          <div className="p-4 border-2 border-red-500 bg-red-950/60 text-red-300 rounded-lg my-4">
            <h3 className="text-xs font-bold mb-1">⚠️ SCANNING FAILURE</h3>
            <p className="text-xs">{error}</p>
          </div>
        )}

        {!loading && result && (
          <StackResults data={result} />
        )}
      </main>

      <footer className="border-t border-zinc-800/80 pt-4 mt-6 flex items-center justify-between text-[11px] text-zinc-600 font-mono">
        <span>HOWBUILT — INSTANT TECH STACK DETECTOR</span>
        <button onClick={() => navigate('/')} className="hover:text-zinc-400 transition-colors">
          ← Landing
        </button>
      </footer>
    </WebsiteFrame>
  );
};
