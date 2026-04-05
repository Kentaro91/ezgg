import { Link } from 'react-router-dom';

const games = [
  {
    id: 'd2r',
    title: 'Diablo II: Resurrected',
    subtitle: '디아블로 2 레저렉션',
    guides: [
      { path: '/d2r/warlock', label: '액트 진행 가이드' },
      { path: '/d2r/runewords', label: '룬워드 계산기' },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-black text-white">
            EZ
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">EZGG</h1>
            <p className="text-xs text-white/30">게임 가이드 & 팁 모음</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
          >
            <h2 className="text-base font-bold text-white/90 mb-0.5">{game.title}</h2>
            <p className="text-white/30 text-xs mb-4">{game.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {game.guides.map((guide) => (
                <Link
                  key={guide.path}
                  to={guide.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/60 bg-white/[0.04] border border-white/[0.06] hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-400 transition-all"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
