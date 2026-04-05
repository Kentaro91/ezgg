import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const navItems = [
  { path: '/d2r/warlock', label: 'D2R' },
];

export default function Layout() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        isDark ? 'border-white/[0.06] bg-[#0d0d15]/80' : 'border-black/[0.06] bg-white/80'
      }`}>
        <div className="max-w-6xl mx-auto px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] font-black text-white tracking-tight">
                EZ
              </div>
              <span className={`text-sm font-bold transition-colors tracking-wide ${
                isDark ? 'text-white/90 group-hover:text-white' : 'text-gray-800 group-hover:text-black'
              }`}>
                EZGG
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      active
                        ? isDark ? 'bg-white/10 text-white' : 'bg-black/8 text-gray-900'
                        : isDark ? 'text-white/40 hover:text-white/70 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={toggle}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isDark ? 'hover:bg-white/10 text-white/50 hover:text-white/80' : 'hover:bg-black/5 text-gray-400 hover:text-gray-700'
            }`}
            title={isDark ? '라이트 모드' : '다크 모드'}
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className={`border-t py-6 text-center text-xs ${
        isDark ? 'border-white/[0.06] text-white/20' : 'border-black/[0.06] text-gray-300'
      }`}>
        EZGG — 개인 게임 가이드 모음
      </footer>
    </div>
  );
}
