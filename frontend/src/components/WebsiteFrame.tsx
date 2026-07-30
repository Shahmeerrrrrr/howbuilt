import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const WebsiteFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 my-auto">
      {/* Centered Main Website Container with 6px Border */}
      <div className="relative w-full border-[4px] sm:border-[6px] border-zinc-800 rounded-2xl shadow-2xl bg-zinc-950 text-zinc-100 p-3 sm:p-6 md:p-8 overflow-hidden min-h-[85vh] flex flex-col justify-between">

        {/* 2 Sleek Vertical Fading Grid Lines */}
        <div className="absolute top-0 left-4 sm:left-10 md:left-16 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent pointer-events-none z-0" />
        <div className="absolute top-0 right-4 sm:right-10 md:right-16 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent pointer-events-none z-0" />

        {/* 2 Sleek Horizontal Fading Grid Lines */}
        <div className="absolute top-24 sm:top-28 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent pointer-events-none z-0" />

        {/* Website Content */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};
