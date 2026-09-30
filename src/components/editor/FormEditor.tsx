import React, { useState, useMemo } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { M3LinearProgress, M3Button } from '../m3';
import {
  IdentitySection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  SocialsSection,
  ThemeSection,
} from './sections';
import {
  User,
  Wrench,
  Briefcase,
  FolderGit2,
  Share2,
  Palette,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
} from 'lucide-react';

export interface FormEditorProps {
  data: PortfolioData;
  theme: 'dark' | 'light';
  onChange: (updated: PortfolioData) => void;
  onEnhanceBullet: (
    bulletText: string,
    roleContext?: { role?: string; company?: string },
    bulletIndex?: number,
    expIndex?: number
  ) => void;
}

export type FormSectionKey = 'basics' | 'experience' | 'projects' | 'skills' | 'socials' | 'theme';

interface SectionConfig {
  key: FormSectionKey;
  label: string;
  stepNumber: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  data,
  theme,
  onChange,
  onEnhanceBullet,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<FormSectionKey>('basics');
  const [searchQuery, setSearchQuery] = useState('');

  // Profile Completeness Calculation
  const completeness = useMemo(() => {
    let score = 0;
    if (data.basics.name) score += 15;
    if (data.basics.headline) score += 15;
    if (data.basics.bio && data.basics.bio.length > 50) score += 15;
    if (data.basics.email) score += 10;
    if (data.experience.length > 0) score += 15;
    if (data.projects.length > 0) score += 15;
    if (data.skills.length > 0) score += 15;
    return Math.min(100, score);
  }, [data]);

  // Section tabs ribbon configuration
  const sections: SectionConfig[] = useMemo(
    () => [
      {
        key: 'basics',
        stepNumber: 1,
        label: 'Identity',
        subtitle: 'Personal brand coordinates, executive bio, and contact info',
        icon: User,
      },
      {
        key: 'experience',
        stepNumber: 2,
        label: 'Experience',
        subtitle: 'Leadership chronology, career trajectory, and X-Y-Z formula accomplishments',
        icon: Briefcase,
        count: data.experience.length,
      },
      {
        key: 'projects',
        stepNumber: 3,
        label: 'Projects',
        subtitle: 'Architectural case studies, production demo links, and open-source packages',
        icon: FolderGit2,
        count: data.projects.length,
      },
      {
        key: 'skills',
        stepNumber: 4,
        label: 'Skills',
        subtitle: 'Categorized technical proficiencies, frameworks, and cloud systems',
        icon: Wrench,
        count: data.skills.length,
      },
      {
        key: 'socials',
        stepNumber: 5,
        label: 'Socials',
        subtitle: 'Verified developer handles, GitHub, LinkedIn, and external writings',
        icon: Share2,
        count: data.basics.socials?.length || 0,
      },
      {
        key: 'theme',
        stepNumber: 6,
        label: 'Theme & Style',
        subtitle: 'Curated color palettes, editorial typography, and visual lighting',
        icon: Palette,
      },
    ],
    [data]
  );

  const activeIndex = sections.findIndex((s) => s.key === activeTab);
  const currentSection = sections[activeIndex] || sections[0];
  const prevSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection = activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;

  // Filtered projects for search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return data.projects;
    const q = searchQuery.toLowerCase();
    return data.projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [data.projects, searchQuery]);

  return (
    <div className="h-full flex flex-col overflow-hidden select-text">
      {/* Top Segmented Stepper Bar: Cohesively Blends into Canvas */}
      <header
        className={`px-5 py-3.5 border-b shrink-0 transition-colors ${
          isDark ? 'bg-[#0a0d14] border-[#18202e]' : 'bg-[#fcfdfd] border-slate-200/80'
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Completeness Bar & Step Indicator */}
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Step {currentSection.stepNumber} of {sections.length}:
              </span>
              <span className="font-bold text-indigo-500">{currentSection.label}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[11px] opacity-60 font-mono hidden sm:inline">Completeness:</span>
              <div className="w-24 sm:w-32">
                <M3LinearProgress value={completeness} />
              </div>
              <span className="font-mono text-xs font-bold text-indigo-500">{completeness}%</span>
            </div>
          </div>

          {/* Stepper Tabs Ribbon */}
          <nav aria-label="Editor sections" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeTab === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveTab(section.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isDark
                      ? 'bg-[#111724] text-slate-400 hover:text-white hover:bg-[#182234] border border-[#1e2738]'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-400/20 text-current'
                    }`}
                  >
                    {section.stepNumber}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{section.label}</span>
                  {section.count !== undefined && section.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isDark
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {section.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Single-Section Focused Canvas with Generous Spacing */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 md:py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section Breadcrumb & Header Title */}
          <div className="space-y-1.5 pb-2">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-indigo-500 font-bold">
              <span>Section {currentSection.stepNumber}</span>
              <span>•</span>
              <span>{currentSection.label}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentSection.label}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              {currentSection.subtitle}
            </p>
          </div>

          {/* Single Focused Content Area */}
          <div className="space-y-8">
            {activeTab === 'basics' && (
              <IdentitySection
                basics={data.basics}
                onChange={(updatedBasics) => onChange({ ...data, basics: updatedBasics })}
                isDark={isDark}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection
                experience={data.experience}
                onChange={(updatedExp) => onChange({ ...data, experience: updatedExp })}
                onEnhanceBullet={onEnhanceBullet}
                isDark={isDark}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsSection
                projects={filteredProjects}
                onChange={(updatedProj) => onChange({ ...data, projects: updatedProj })}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                isDark={isDark}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                skills={data.skills}
                onChange={(updatedSkills) => onChange({ ...data, skills: updatedSkills })}
                isDark={isDark}
              />
            )}

            {activeTab === 'socials' && (
              <SocialsSection
                socials={data.basics.socials || []}
                onChange={(updatedSocials) =>
                  onChange({
                    ...data,
                    basics: { ...data.basics, socials: updatedSocials },
                  })
                }
                isDark={isDark}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeSection
                meta={data.meta}
                onChange={(updatedMeta) => onChange({ ...data, meta: updatedMeta })}
                isDark={isDark}
              />
            )}
          </div>

          {/* Clean Stepper Navigation Footer with Generous Blank Space */}
          <footer className="pt-8 pb-12 border-t border-slate-700/15 flex items-center justify-between gap-4">
            {prevSection ? (
              <button
                onClick={() => setActiveTab(prevSection.key)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                  isDark
                    ? 'border-[#1e2738] bg-[#111724] text-slate-300 hover:bg-[#182234] hover:text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-2xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevSection.label}</span>
              </button>
            ) : (
              <div />
            )}

            {nextSection ? (
              <button
                onClick={() => setActiveTab(nextSection.key)}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>Continue to {nextSection.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('basics')}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Review from Start</span>
              </button>
            )}
          </footer>
        </div>
      </main>
    </div>
  );
};
