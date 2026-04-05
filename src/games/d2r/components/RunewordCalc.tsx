import { useState, useMemo } from 'react';
import { runewordsData } from '../data/runewords';
import { useTheme } from '../../../components/ThemeProvider';

type Filter = 'all' | 'weapon' | 'armor' | 'helmet' | 'shield';

const filterLabels: Record<Filter, string> = {
  all: '전체',
  weapon: '무기',
  armor: '갑옷',
  helmet: '투구',
  shield: '방패',
};

export default function RunewordCalc() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [socketFilter, setSocketFilter] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filtered = useMemo(() => {
    return runewordsData.filter((rw) => {
      if (filter !== 'all' && rw.category !== filter && rw.category !== 'all') return false;
      if (socketFilter !== null && rw.sockets !== socketFilter && rw.sockets !== 0) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          rw.name.includes(q) ||
          rw.nameEn.toLowerCase().includes(q) ||
          rw.runes.some((r) => r.toLowerCase().includes(q)) ||
          rw.bases.some((b) => b.includes(q))
        );
      }
      return true;
    });
  }, [search, filter, socketFilter]);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.07] via-transparent to-transparent pointer-events-none" />
        <div className="relative pt-6 pb-4 px-4">
          <div className="max-w-[880px] mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                D2R
              </div>
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              룬워드 계산기
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
              룬워드 검색 및 필터
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[880px] mx-auto px-3.5 pb-8">
        {/* Search & Filters */}
        <div className="mt-4 mb-4 space-y-3">
          <input
            type="text"
            placeholder="룬워드 / 룬 이름 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors ${
              isDark
                ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/25 focus:border-blue-500/40'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
            }`}
          />
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(filterLabels) as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                  filter === f
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : isDark
                      ? 'text-white/40 border border-white/[0.06] hover:text-white/60'
                      : 'text-gray-400 border border-gray-200 hover:text-gray-600'
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
            <div className={`w-px mx-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            {[2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setSocketFilter(socketFilter === s ? null : s)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                  socketFilter === s
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : isDark
                      ? 'text-white/40 border border-white/[0.06] hover:text-white/60'
                      : 'text-gray-400 border border-gray-200 hover:text-gray-600'
                }`}
              >
                {s}소켓
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className={`text-[11px] mb-2 ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
          {filtered.length}개 결과
        </div>

        <div className="space-y-2">
          {filtered.map((rw) => (
            <div
              key={rw.nameEn}
              className={`p-4 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-bg-tertiary border-border-primary hover:border-border-secondary'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className={`font-bold text-sm ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                    {rw.name}
                    <span className={`ml-2 font-normal text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                      {rw.nameEn}
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      isDark ? 'bg-gold/10 text-gold border-gold/20' : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {rw.sockets > 0 ? `${rw.sockets}소켓` : '유니크'}
                    </span>
                    <span className={`text-[10px] ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                      Lv.{rw.level} | {rw.bases.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {rw.runes.length > 0 && (
                <div className="flex gap-1 mb-2">
                  {rw.runes.map((rune, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isDark ? 'bg-fire/15 text-fire-light border border-fire/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}
                    >
                      {rune}
                    </span>
                  ))}
                </div>
              )}

              <div className={`text-xs leading-relaxed whitespace-pre-line ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {rw.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
