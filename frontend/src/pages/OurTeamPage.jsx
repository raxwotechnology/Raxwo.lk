import React, { useState } from 'react';
import { 
  Users, ArrowRight, RefreshCw, ChevronRight, 
  Sparkles, ShieldCheck, HeartHandshake 
} from 'lucide-react';

export default function OurTeamPage({ 
  theme = 'dark', 
  lang = 'en',
  onContactClick,
  onExploreProducts 
}) {
  const isDark = theme === 'dark';
  const isSi = lang === 'si';
  const isTa = lang === 'ta';

  const [isLoading, setIsLoading] = useState(true);
  const [frameKey, setFrameKey] = useState(Date.now());

  const handleRefresh = () => {
    setIsLoading(true);
    setFrameKey(Date.now());
  };

  return (
    <div className={`w-full min-h-screen py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-300 ${
      isDark ? 'bg-[#0c0827] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Breadcrumb & Header */}
      <div className="max-w-7xl mx-auto mb-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold mb-4 text-slate-400">
          <button 
            onClick={onExploreProducts}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            {isSi ? 'මුල් පිටුව' : isTa ? 'முகப்பு' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className={isDark ? 'text-cyan-400' : 'text-blue-600'}>
            {isSi ? 'අපේ කණ්ඩායම' : isTa ? 'எங்கள் குழு' : 'Our Team'}
          </span>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b pb-6 border-slate-800/40">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border ${
              isDark 
                ? 'bg-blue-500/10 text-cyan-400 border-blue-500/30' 
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              <Users className="w-3.5 h-3.5" />
              <span>{isSi ? 'නිර්මාණශීලී කණ්ඩායම' : isTa ? 'எங்கள் திறமையான குழு' : 'The Minds Behind Raxwo'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {isSi ? 'අපේ කණ්ඩායම' : isTa ? 'எங்கள் குழு' : 'Our Team'}
            </h1>
            
            <p className={`mt-2.5 text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isSi 
                ? 'Raxwo මෘදුකාංග පද්ධති සංවර්ධනය කරන, නඩත්තු කරන සහ පාරිභෝගික සහාය ලබා දෙන අපගේ තාක්ෂණික කණ්ඩායම හමුවන්න.'
                : isTa 
                ? 'Raxwo தொழில்நுட்ப அமைப்புகளை உருவாக்கும், பராமரிக்கும் மற்றும் வாடிக்கையாளர் ஆதரவை வழங்கும் எங்கள் குழுவை சந்திக்கவும்.'
                : 'Meet the software engineers, UX designers, system architects, and business consultants shaping high-performance business software.'}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                isDark 
                  ? 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
              <span>{isSi ? 'නැවත පූරණය කරන්න' : isTa ? 'புதுப்பிக்கவும்' : 'Refresh View'}</span>
            </button>

            <button
              onClick={onContactClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isSi ? 'සම්බන්ධ වන්න' : isTa ? 'தொடர்பு கொள்ள' : 'Contact Team'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Live Viewer Container */}
      <div className="max-w-7xl mx-auto">
        <div className={`relative w-full rounded-3xl overflow-hidden border shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#0a0f24] border-slate-800/80' 
            : 'bg-white border-slate-200'
        }`}>
          
          {/* Top Browser Pill Header */}
          <div className={`flex items-center justify-between px-5 py-3 border-b text-xs select-none ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/90 border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className={`ml-2 font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                raxwo.lk / our-team
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {isSi ? 'සජීවීව' : isTa ? 'நேரலை' : 'Live Connected'}
              </span>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md gap-3">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-slate-300">
                {isSi ? 'කණ්ඩායමේ විස්තර පූරණය වෙමින් පවතී...' : isTa ? 'குழு விவரங்கள் ஏற்றப்படுகின்றன...' : 'Loading Our Team...'}
              </p>
            </div>
          )}

          {/* Embedded Iframe (Opens directly within raxwo.lk) */}
          <iframe
            key={frameKey}
            src="https://manage.raxwo.net/our-team"
            title="Raxwo Our Team"
            onLoad={() => setIsLoading(false)}
            className="w-full h-[78vh] sm:h-[84vh] border-0 rounded-b-3xl bg-white"
          />

        </div>
      </div>

    </div>
  );
}
