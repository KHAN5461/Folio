import React from 'react';
import { ExperienceItem } from '../../../types/portfolio';
import { M3Card, M3TextField, M3Button, M3IconButton, M3Switch, M3Chip, M3EmptyState } from '../../m3';
import { Briefcase, Plus, Trash2, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
  onEnhanceBullet: (
    bulletText: string,
    roleContext?: { role?: string; company?: string },
    bulletIndex?: number,
    expIndex?: number
  ) => void;
  isDark?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  onChange,
  onEnhanceBullet,
  isDark = true,
}) => {
  const addExperience = () => {
    const newExp: ExperienceItem = {
      company: 'High-Growth Tech Co',
      role: 'Senior Software Engineer',
      startDate: '2023-03',
      endDate: null,
      current: true,
      bullets: [
        'Spearheaded transition to event-driven microservices, reducing p99 latency by 38% under 2M req/sec load.',
      ],
    };
    onChange([newExp, ...experience]);
  };

  const moveExperience = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= experience.length) return;
    const items = [...experience];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    onChange(items);
  };

  const removeExperience = (idx: number) => {
    onChange(experience.filter((_, i) => i !== idx));
  };

  const updateExpField = (idx: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const addExpBullet = (expIdx: number) => {
    const updated = [...experience];
    updated[expIdx] = {
      ...updated[expIdx],
      bullets: [...updated[expIdx].bullets, ''],
    };
    onChange(updated);
  };

  const updateExpBullet = (expIdx: number, bulletIdx: number, val: string) => {
    const updated = [...experience];
    const newBullets = [...updated[expIdx].bullets];
    newBullets[bulletIdx] = val;
    updated[expIdx] = { ...updated[expIdx], bullets: newBullets };
    onChange(updated);
  };

  const removeExpBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...experience];
    const newBullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    updated[expIdx] = { ...updated[expIdx], bullets: newBullets };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl border border-slate-700/10 bg-slate-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold">
              Work History ({experience.length} Roles)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Arrange positions in reverse-chronological sequence
            </p>
          </div>
        </div>

        <M3Button
          variant="filled"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={addExperience}
        >
          Add Position
        </M3Button>
      </div>

      {/* Position Cards Stack */}
      <div className="space-y-6">
        {experience.length === 0 ? (
          <M3EmptyState
            type="no-experience"
            title="No career experience added yet"
            description="Add your leadership roles, internships, or open-source maintainer history to demonstrate your career velocity."
            actionLabel="Add First Position"
            onAction={addExperience}
          />
        ) : (
          experience.map((exp, expIdx) => (
            <M3Card
              key={expIdx}
              variant="elevated"
              className="space-y-6 p-6 sm:p-7 relative overflow-hidden"
            >
              {/* Header with Title and Reordering Buttons */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono font-bold text-xs flex items-center justify-center">
                    {expIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">
                      {exp.role || 'New Role'}
                    </h3>
                    <p className="text-xs text-indigo-500 font-medium">
                      {exp.company || 'Company'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <M3IconButton
                    variant="standard"
                    size="sm"
                    disabled={expIdx === 0}
                    onClick={() => moveExperience(expIdx, expIdx - 1)}
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  </M3IconButton>
                  <M3IconButton
                    variant="standard"
                    size="sm"
                    disabled={expIdx === experience.length - 1}
                    onClick={() => moveExperience(expIdx, expIdx + 1)}
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </M3IconButton>
                  <M3IconButton
                    variant="standard"
                    size="sm"
                    onClick={() => removeExperience(expIdx)}
                    title="Delete role"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </M3IconButton>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <M3TextField
                    label="Company / Organization"
                    value={exp.company}
                    onChange={(val) => updateExpField(expIdx, 'company', val)}
                    placeholder="e.g. Google, Stripe, Vercel"
                  />
                  <M3TextField
                    label="Role / Title"
                    value={exp.role}
                    onChange={(val) => updateExpField(expIdx, 'role', val)}
                    placeholder="e.g. Staff Software Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <M3TextField
                    label="Start Date (YYYY-MM)"
                    value={exp.startDate}
                    onChange={(val) => updateExpField(expIdx, 'startDate', val)}
                    placeholder="2022-01"
                  />

                  <M3TextField
                    label="End Date (YYYY-MM)"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate || ''}
                    onChange={(val) => updateExpField(expIdx, 'endDate', val)}
                    placeholder="2024-06"
                  />

                  <div className="pt-1 px-1">
                    <M3Switch
                      checked={!!exp.current}
                      onChange={(checked) => updateExpField(expIdx, 'current', checked)}
                      label="Currently Working Here"
                    />
                  </div>
                </div>
              </div>

              {/* Bullets List with Generous Spacing */}
              <div className="space-y-3 pt-4 border-t border-slate-700/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Impact Accomplishments ({exp.bullets.length})
                  </span>
                  <button
                    onClick={() => addExpBullet(expIdx)}
                    className="text-xs font-bold text-indigo-500 hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Accomplishment</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className={`p-4 rounded-2xl border space-y-3 transition-all ${
                        isDark
                          ? 'bg-[#0a0e17] border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => updateExpBullet(expIdx, bIdx, e.target.value)}
                          className={`w-full bg-transparent text-xs sm:text-sm leading-relaxed resize-none focus:outline-none ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                          placeholder="Accomplished [X], as measured by [Y], by doing [Z]..."
                        />
                        <button
                          onClick={() => removeExpBullet(expIdx, bIdx)}
                          className="text-slate-400 hover:text-red-500 p-1 cursor-pointer shrink-0"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/10 text-xs">
                        <span className="text-[11px] font-mono text-slate-400">
                          {bullet.length} characters
                        </span>

                        <M3Chip
                          variant="assist"
                          label="Optimize with X-Y-Z formula"
                          icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                          onClick={() =>
                            onEnhanceBullet(
                              bullet,
                              { role: exp.role, company: exp.company },
                              bIdx,
                              expIdx
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </M3Card>
          ))
        )}
      </div>

      {experience.length > 0 && (
        <div className="flex justify-center pt-2">
          <M3Button
            variant="tonal"
            icon={<Plus className="w-4 h-4" />}
            onClick={addExperience}
          >
            Add Another Position
          </M3Button>
        </div>
      )}
    </div>
  );
};
