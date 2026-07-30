import React, { useEffect, useState } from 'react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  targetUrl: string;
  onComplete?: () => void;
}

const STEPS = [
  'INITIALIZING HOWBUILT SCANNER ENGINE...',
  'Detector 1: Downloading HTML & parsing DOM tree...',
  'Detector 2: Inspecting HTTP Server & Proxy Headers...',
  'Detector 3: Searching JS Bundles (_next/, __NEXT_DATA__, react, vue)...',
  'Detector 4: Scanning CSS variables & utility classes (--tw, tailwind)...',
  'Detector 5: Parsing CSS @font-face & Google Font links...',
  'Detector 6: Scanning Analytics trackers (Google Analytics, PostHog)...',
  'Detector 7: Inspecting Payment gateways (Stripe, Paddle, LemonSqueezy)...',
  'Detector 8: Checking Authentication providers (Clerk, Auth0, Supabase)...',
  'Detector 9: Scanning Media CDN & Image transformers...',
  'Detector 10: Inspecting Headless CMS endpoints...',
  'SECURITY ENGINE: Evaluating CSP, HSTS & Cookie flags...',
  'AI EXPLAINER: Synthesizing architectural breakdown...'
];

export const TerminalLogs: React.FC<Props> = ({ targetUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pixel-card" style={{ marginBottom: '2rem', border: '3px solid var(--text-color)' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid var(--card-border)',
        paddingBottom: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={18} />
          <span className="font-pixel" style={{ fontSize: '0.9rem' }}>
            SCANNING LOGS — {targetUrl}
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontFamily: 'var(--font-mono)' }}>
          {Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}% COMPLETE
        </div>
      </div>

      <div style={{
        backgroundColor: '#000',
        color: '#00ff66',
        padding: '1rem',
        border: '2px solid #333',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        lineHeight: 1.7,
        maxHeight: '220px',
        overflowY: 'auto'
      }}>
        {STEPS.slice(0, currentStepIndex + 1).map((step, idx) => {
          const isFinished = idx < currentStepIndex || currentStepIndex === STEPS.length - 1;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isFinished ? (
                <CheckCircle2 size={12} color="#00ff66" />
              ) : (
                <Loader2 size={12} className="spin" color="#ffff00" />
              )}
              <span style={{ color: isFinished ? '#00ff66' : '#ffff00' }}>
                [{(idx + 1).toString().padStart(2, '0')}] {step}
              </span>
            </div>
          );
        })}
        <div style={{ marginTop: '0.4rem' }}>
          <span style={{ color: '#fff' }}>HOWBUILT&gt;</span>
          <span className="pixel-cursor" />
        </div>
      </div>
    </div>
  );
};
