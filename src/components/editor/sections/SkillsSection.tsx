import React, { useState } from 'react';
import { SkillCategory } from '../../../types/portfolio';
import { M3Card, M3Button, M3IconButton, M3Chip } from '../../m3';
import { Wrench, Plus, Trash2, Check, Flame } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
  isDark?: boolean;
}

const POPULAR_SKILL_SUGGESTIONS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Go',
  'Python',
  'Rust',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'GraphQL',
  'Tailwind CSS',
  'AWS',
  'Distributed Systems',
  'Kafka',
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onChange,
  isDark = true,
}) => {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({});

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      category: 'Cloud & Infrastructure',
      items: ['AWS', 'Docker', 'Kubernetes'],
    };
    onChange([...skills, newCategory]);
  };

  const removeSkillCategory = (idx: number) => {
    onChange(skills.filter((_, i) => i !== idx));
  };

  const updateSkillCategoryName = (idx: number, name: string) => {
    const updated = [...skills];
    updated[idx] = { ...updated[idx], category: name };
    onChange(updated);
  };

  const addSkillChip = (categoryIdx: number, item: string) => {
    if (!item.trim()) return;
    const updated = [...skills];
    if (!updated[categoryIdx].items.includes(item.trim())) {
      updated[categoryIdx] = {
        ...updated[categoryIdx],
        items: [...updated[categoryIdx].items, item.trim()],
      };
      onChange(updated);
    }
    setNewSkillInputs((prev) => ({ ...prev, [categoryIdx]: '' }));
  };

  const removeSkillChip = (categoryIdx: number, itemIdx: number) => {
    const updated = [...skills];
    updated[categoryIdx] = {
      ...updated[categoryIdx],
      items: updated[categoryIdx].items.filter((_, i) => i !== itemIdx),
    };
    onChange(updated);
  };

  const quickAddPopularSkill = (skillName: string) => {
    if (skills.length === 0) {
      onChange([{ category: 'Core Technologies', items: [skillName] }]);
      return;
    }
    const updated = [...skills];
    if (!updated[0].items.includes(skillName)) {
      updated[0] = {
        ...updated[0],
        items: [...updated[0].items, skillName],
      };
      onChange(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl border border-slate-700/10 bg-slate-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-500 font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold">
              Technical Proficiencies ({skills.length} Categories)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Group your tools, programming languages, and specialized domains
            </p>
          </div>
        </div>

        <M3Button
          variant="filled"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={addSkillCategory}
        >
          Add Category
        </M3Button>
      </div>

      {/* Quick 1-Click Popular Tech Suggestions */}
      <M3Card variant="filled" className="p-5 space-y-3 border border-slate-700/10">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
          <Flame className="w-4 h-4" />
          <span>Quick-Add Popular Industry Technologies:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILL_SUGGESTIONS.map((skill) => (
            <button
              key={skill}
              onClick={() => quickAddPopularSkill(skill)}
              className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer"
            >
              + {skill}
            </button>
          ))}
        </div>
      </M3Card>

      {/* Skill Categories Stack */}
      <div className="space-y-5">
        {skills.map((skillGroup, idx) => (
          <M3Card
            key={idx}
            variant="elevated"
            className="p-6 space-y-4 border border-slate-700/15"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={skillGroup.category}
                  onChange={(e) => updateSkillCategoryName(idx, e.target.value)}
                  className="bg-transparent font-bold text-sm sm:text-base border-b border-transparent hover:border-slate-600 focus:border-amber-500 focus:outline-none"
                  placeholder="Category Name"
                />
              </div>

              <M3IconButton
                variant="standard"
                size="sm"
                onClick={() => removeSkillCategory(idx)}
                title="Delete category"
              >
                <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
              </M3IconButton>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {skillGroup.items.map((item, itemIdx) => (
                <M3Chip
                  key={itemIdx}
                  variant="input"
                  label={item}
                  onRemove={() => removeSkillChip(idx, itemIdx)}
                />
              ))}

              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={newSkillInputs[idx] || ''}
                  onChange={(e) =>
                    setNewSkillInputs((prev) => ({ ...prev, [idx]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillChip(idx, newSkillInputs[idx] || '');
                    }
                  }}
                  placeholder="+ Add skill (Enter)..."
                  className={`text-xs px-3.5 py-1.5 rounded-full border border-dashed font-mono focus:outline-none transition-all w-36 ${
                    isDark
                      ? 'bg-transparent border-slate-700 text-slate-300 focus:border-amber-500'
                      : 'bg-transparent border-slate-300 text-slate-700 focus:border-amber-500'
                  }`}
                />
                {newSkillInputs[idx] && (
                  <button
                    onClick={() => addSkillChip(idx, newSkillInputs[idx] || '')}
                    className="p-1 rounded-full bg-amber-500 text-black text-xs font-bold cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </M3Card>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <M3Button
          variant="tonal"
          icon={<Plus className="w-4 h-4" />}
          onClick={addSkillCategory}
        >
          Add Another Skill Category
        </M3Button>
      </div>
    </div>
  );
};
