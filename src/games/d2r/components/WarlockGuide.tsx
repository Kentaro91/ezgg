import { useState, useCallback, useMemo } from 'react';
import { warlockGuideData, d2rClasses } from '../data/warlockGuide';
import type { GuideStep, TagType, BadgeColor } from '../data/warlockGuide';
import { useTheme } from '../../../components/ThemeProvider';

const STORAGE_KEY = 'd2r-warlock-checked';

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveChecked(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

const tagStyles: Record<TagType, string> = {
  skill: 'bg-fire/15 text-fire-light border-fire/25',
  stat: 'bg-info/12 text-info border-info/20',
  item: 'bg-gold/12 text-gold border-gold/20',
  tip: 'bg-echo/12 text-echo border-echo/20',
  warning: 'bg-danger/12 text-danger border-danger/20',
  map: 'bg-magic/12 text-magic-light border-magic/20',
  quest: 'bg-echo/12 text-echo-light border-echo/20',
  boss: 'bg-danger/12 text-danger border-danger/20',
  farm: 'bg-gold/12 text-gold border-gold/20',
};

const badgeStyles: Record<BadgeColor, string> = {
  fire: 'bg-fire',
  magic: 'bg-magic',
  echo: 'bg-echo',
  gold: 'bg-gold text-black',
  danger: 'bg-danger',
};

function StepCard({
  step,
  checked,
  onToggle,
}: {
  step: GuideStep;
  checked: boolean;
  onToggle: () => void;
}) {
  const isClassTip = !!step.classId;
  return (
    <div
      onClick={onToggle}
      className={`relative pl-12 p-3.5 border rounded-lg mb-1.5 transition-all cursor-pointer select-none ${
        checked
          ? 'bg-bg-primary/60 border-border-primary opacity-50'
          : isClassTip
            ? 'bg-cyan-950/20 border-cyan-500/20 hover:border-cyan-500/30'
            : `bg-bg-tertiary hover:border-border-secondary ${step.highlight ? 'border-fire' : 'border-border-primary'}`
      }`}
    >
      <div
        className={`absolute left-3 top-3.5 w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
          checked
            ? 'bg-echo/80 text-white'
            : `text-white ${badgeStyles[step.badgeColor]}`
        }`}
      >
        {checked ? '✓' : step.badge}
      </div>
      <div
        className={`font-bold text-[13px] mb-1 flex items-center gap-1.5 flex-wrap ${checked ? 'text-text-dim line-through' : 'text-text-bright'}`}
      >
        {step.tags?.map((tag, i) => (
          <span
            key={i}
            className={`inline-block px-1.5 py-0 rounded text-[10px] font-bold border ${checked ? 'opacity-40' : ''} ${tagStyles[tag.type]}`}
          >
            {tag.label}
          </span>
        ))}
        <span>{step.title}</span>
      </div>
      <div
        className={`text-[13px] leading-relaxed whitespace-pre-line ${checked ? 'text-text-dim' : 'text-text-primary'}`}
      >
        {step.content}
      </div>
    </div>
  );
}

function ImagePanel({
  title,
  src,
  onZoom,
}: {
  title: string;
  src: string;
  onZoom: (src: string, alt: string) => void;
}) {
  return (
    <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-border-primary">
        <h3 className="text-sm font-bold text-gold">{title}</h3>
        <p className="text-[10px] text-text-dim">출처: 참타호</p>
      </div>
      <img
        src={src}
        alt={title}
        className="w-full block cursor-zoom-in hover:opacity-90 transition-opacity"
        onClick={() => onZoom(src, title)}
      />
    </div>
  );
}

function ImageModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
      />
    </div>
  );
}

export default function WarlockGuide() {
  const [activePhase, setActivePhase] = useState('normal');
  const [selectedClass, setSelectedClass] = useState<string | null>('warlock');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [checkedSet, setCheckedSet] = useState<Set<string>>(loadChecked);

  const toggleCheck = useCallback((key: string) => {
    setCheckedSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      saveChecked(next);
      return next;
    });
  }, []);

  const visiblePhases = useMemo(
    () => warlockGuideData.filter((p) => !p.classOnly || p.classOnly === selectedClass),
    [selectedClass],
  );

  const currentPhase = visiblePhases.find((p) => p.id === activePhase) ?? visiblePhases[0];
  const isStatsTab = activePhase === 'stats';
  const selectedClassInfo = d2rClasses.find((c) => c.id === selectedClass);
  const [statsPanelOpen, setStatsPanelOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isActTab = ['normal', 'nm', 'hell'].includes(currentPhase.id);
  const statsPhase = warlockGuideData.find((p) => p.id === 'stats');

  const actHeaders = useMemo(() => {
    return currentPhase.sections
      .map((s, i) => s.type === 'act-header' ? { title: s.actTitle!, index: i } : null)
      .filter((x): x is { title: string; index: number } => x !== null);
  }, [currentPhase]);

  // Progress calculation
  const phaseProgress = useMemo(() => {
    let total = 0;
    let checked = 0;
    currentPhase.sections.forEach((section, si) => {
      if (section.type === 'steps' && section.steps) {
        const filtered = section.steps.filter(
          (s) => !s.classId || s.classId === selectedClass,
        );
        filtered.forEach((step, i) => {
          const key = `${currentPhase.id}-${si}-${i}-${step.title.slice(0, 8)}`;
          total++;
          if (checkedSet.has(key)) checked++;
        });
      }
    });
    return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }, [currentPhase, checkedSet, selectedClass]);

  const resetPhaseChecks = useCallback(() => {
    setCheckedSet((prev) => {
      const next = new Set(prev);
      currentPhase.sections.forEach((section, si) => {
        if (section.type === 'steps' && section.steps) {
          section.steps.forEach((step, i) => {
            const key = `${currentPhase.id}-${si}-${i}-${step.title.slice(0, 8)}`;
            next.delete(key);
          });
        }
      });
      saveChecked(next);
      return next;
    });
  }, [currentPhase]);

  return (
    <div>
      {lightbox && (
        <ImageModal
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
      {/* Hero + Nav combined */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.07] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Hero content */}
        <div className="relative pt-6 pb-4 px-4">
          <div className="max-w-[880px] mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                D2R 액트 진행 가이드
              </div>
            </div>

            {/* Class selector */}
            <div className="flex flex-wrap gap-1.5">
              {d2rClasses.map((cls) => {
                const active = selectedClass === cls.id;
                const hasData = cls.id === 'warlock';
                return (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setSelectedClass(active ? null : cls.id);
                      if (!active) {
                        const firstVisible = warlockGuideData.find(
                          (p) => !p.classOnly || p.classOnly === cls.id,
                        );
                        if (firstVisible && warlockGuideData.find((p) => p.id === activePhase)?.classOnly && warlockGuideData.find((p) => p.id === activePhase)?.classOnly !== cls.id) {
                          setActivePhase(firstVisible.id);
                        }
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      active
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : hasData
                          ? 'text-white/40 border border-white/[0.06] hover:text-white/60 hover:border-white/10'
                          : 'text-white/20 border border-white/[0.04] cursor-default'
                    }`}
                  >
                    {cls.name}
                    {active && <span className="ml-1 text-[9px] text-cyan-400/60">ON</span>}
                  </button>
                );
              })}
            </div>
            {selectedClassInfo && (
              <p className="text-[11px] text-cyan-400/50 mt-2">
                {selectedClassInfo.name} 전용 팁이 포함되어 표시됩니다
              </p>
            )}
          </div>
        </div>

        {/* Tab Nav */}
        <div className={`sticky top-12 z-40 backdrop-blur-xl border-b ${isDark ? 'bg-[#0d0d15]/90 border-white/[0.06]' : 'bg-white/90 border-black/[0.06]'}`}>
          <div className="max-w-[880px] mx-auto px-4 flex gap-1 overflow-x-auto">
            {visiblePhases.map((phase) => {
              const active = currentPhase.id === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`relative shrink-0 px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                    active
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-white/35 hover:text-white/60' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {phase.classOnly && <span className="text-cyan-400/60 mr-1">●</span>}
                  {phase.label}
                  {active && (
                    <div className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[880px] mx-auto px-3.5 pb-8">
        {/* Phase Header + Progress */}
        <div className="mt-4 mb-3">
          <div className="flex items-center justify-between gap-4 px-4 py-3 border-l-2 border-blue-500/50">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white/90">{currentPhase.title}</h2>
              {currentPhase.subtitle && (
                <p className="text-xs text-white/30 mt-0.5">{currentPhase.subtitle}</p>
              )}
            </div>
            {phaseProgress.total > 0 && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold text-white/40 tabular-nums">
                  {phaseProgress.checked}/{phaseProgress.total}
                </span>
                {phaseProgress.checked > 0 && (
                  <button
                    onClick={resetPhaseChecks}
                    className="text-[10px] text-white/25 hover:text-danger transition-colors px-1.5 py-0.5 rounded border border-white/[0.06] hover:border-danger/30"
                    title="체크 초기화"
                  >
                    초기화
                  </button>
                )}
              </div>
            )}
          </div>
          {phaseProgress.total > 0 && (
            <div className="mx-4 h-0.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${phaseProgress.pct}%` }}
              />
            </div>
          )}
        </div>

        {/* Act quick nav */}
        {actHeaders.length > 0 && (
          <div className="flex gap-1.5 mt-3 mb-2 overflow-x-auto">
            {actHeaders.map((act) => (
              <button
                key={act.index}
                onClick={() => {
                  document.getElementById(`act-${currentPhase.id}-${act.index}`)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`shrink-0 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                  isDark
                    ? 'text-magic-light/70 border border-magic/20 hover:bg-magic/10 hover:text-magic-light'
                    : 'text-purple-500/70 border border-purple-200 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {act.title}
              </button>
            ))}
          </div>
        )}

        {/* Stats tab: images first */}
        {isStatsTab && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <ImagePanel
              title="스킬 투자 순서"
              src="/images/d2r/skill.png"
              onZoom={(s, a) => setLightbox({ src: s, alt: a })}
            />
            <ImagePanel
              title="초반 스탯 투자"
              src="/images/d2r/stat.png"
              onZoom={(s, a) => setLightbox({ src: s, alt: a })}
            />
          </div>
        )}

        {/* Sections */}
        {currentPhase.sections.map((section, si) => {
          if (section.type === 'act-header') {
            return (
              <div
                key={si}
                id={`act-${currentPhase.id}-${si}`}
                className="scroll-mt-28 bg-bg-secondary border-l-[3px] border-magic px-3.5 py-2.5 rounded-r-md mt-4 mb-2 font-bold text-sm text-magic-light"
              >
                {section.actTitle}
              </div>
            );
          }
          if (section.type === 'steps' && section.steps) {
            const filteredSteps = section.steps.filter(
              (step) => !step.classId || step.classId === selectedClass,
            );
            if (filteredSteps.length === 0) return null;
            return (
              <div key={si}>
                {filteredSteps.map((step, i) => {
                  const key = `${currentPhase.id}-${si}-${i}-${step.title.slice(0, 8)}`;
                  return (
                    <StepCard
                      key={key}
                      step={step}
                      checked={checkedSet.has(key)}
                      onToggle={() => toggleCheck(key)}
                    />
                  );
                })}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Floating stat/skill button - only on act tabs with warlock selected */}
      {isActTab && selectedClass === 'warlock' && (
        <button
          onClick={() => setStatsPanelOpen(true)}
          className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
            isDark
              ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-blue-500/25'
              : 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-blue-500/30'
          }`}
          title="스탯 및 스킬 확인"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}

      {/* Stats/Skill slide panel */}
      {statsPanelOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end" onClick={() => setStatsPanelOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className={`relative w-full max-w-md h-full overflow-y-auto animate-slide-in ${
              isDark ? 'bg-[#0d0d15]' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b backdrop-blur-xl ${
              isDark ? 'bg-[#0d0d15]/95 border-white/[0.06]' : 'bg-white/95 border-gray-200'
            }`}>
              <h3 className={`font-bold text-sm ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                스탯 & 스킬 투자
              </h3>
              <button
                onClick={() => setStatsPanelOpen(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isDark ? 'hover:bg-white/10 text-white/50' : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Panel content */}
            <div className="p-4 space-y-3">
              {/* Images */}
              <ImagePanel
                title="스킬 투자 순서"
                src="/images/d2r/skill.png"
                onZoom={(s, a) => { setStatsPanelOpen(false); setLightbox({ src: s, alt: a }); }}
              />
              <ImagePanel
                title="초반 스탯 투자"
                src="/images/d2r/stat.png"
                onZoom={(s, a) => { setStatsPanelOpen(false); setLightbox({ src: s, alt: a }); }}
              />

              {/* Step cards */}
              {statsPhase?.sections.map((section) =>
                section.type === 'steps' && section.steps
                  ? section.steps.map((step, i) => (
                      <div
                        key={i}
                        className={`relative pl-10 p-3 border rounded-lg ${
                          step.highlight
                            ? 'border-fire'
                            : isDark ? 'border-border-primary bg-bg-tertiary' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className={`absolute left-2.5 top-3 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${badgeStyles[step.badgeColor]}`}>
                          {step.badge}
                        </div>
                        <div className={`font-bold text-[12px] mb-0.5 flex items-center gap-1 flex-wrap ${isDark ? 'text-text-bright' : 'text-gray-900'}`}>
                          {step.tags?.map((tag, ti) => (
                            <span key={ti} className={`inline-block px-1 py-0 rounded text-[9px] font-bold border ${tagStyles[tag.type]}`}>
                              {tag.label}
                            </span>
                          ))}
                          <span>{step.title}</span>
                        </div>
                        <div className={`text-[12px] leading-relaxed whitespace-pre-line ${isDark ? 'text-text-primary' : 'text-gray-600'}`}>
                          {step.content}
                        </div>
                      </div>
                    ))
                  : null,
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
