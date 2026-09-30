import React, { useState } from 'react';
import { ProjectItem } from '../../../types/portfolio';
import { M3Card, M3TextField, M3Button, M3IconButton, M3Switch, M3Chip, M3EmptyState } from '../../m3';
import { FolderGit2, Plus, Trash2, ChevronUp, ChevronDown, Copy, Star, ChevronRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  isDark?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onChange,
  searchQuery = '',
  onClearSearch,
  isDark = true,
}) => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: ProjectItem = {
      id: newId,
      title: 'Distributed System Node',
      description: 'High-throughput networking proxy with sub-millisecond consensus coordination.',
      tags: ['TypeScript', 'Distributed Systems', 'Docker'],
      liveUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com/example/repo',
      featured: true,
      media: [],
    };
    onChange([newProj, ...projects]);
    setExpandedProjects((prev) => ({ ...prev, [newId]: true }));
  };

  const moveProject = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= projects.length) return;
    const items = [...projects];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    onChange(items);
  };

  const duplicateProject = (proj: ProjectItem) => {
    const newId = `proj-${Date.now()}`;
    const clone: ProjectItem = {
      ...proj,
      id: newId,
      title: `${proj.title} (Copy)`,
    };
    onChange([clone, ...projects]);
    setExpandedProjects((prev) => ({ ...prev, [newId]: true }));
  };

  const removeProject = (idx: number) => {
    onChange(projects.filter((_, i) => i !== idx));
  };

  const updateProjectField = (idx: number, field: keyof ProjectItem, value: any) => {
    const updated = [...projects];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const toggleProjectExpand = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl border border-slate-700/10 bg-slate-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-500 font-bold">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold">
              Engineering Showcases ({projects.length} Works)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Architecture case studies, interactive tools, and production repos
            </p>
          </div>
        </div>

        <M3Button
          variant="filled"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={addProject}
        >
          Add Project
        </M3Button>
      </div>

      {/* Projects Stack */}
      <div className="space-y-6">
        {projects.length === 0 ? (
          <M3EmptyState
            type={searchQuery ? 'no-search-results' : 'no-projects'}
            title={searchQuery ? 'No matching engineering works' : 'No projects listed yet'}
            description={
              searchQuery
                ? `No projects, tags, or descriptions matched "${searchQuery}".`
                : 'Showcase your system designs, full-stack applications, and open-source packages.'
            }
            actionLabel={searchQuery ? 'Clear Search Filter' : 'Add First Project'}
            onAction={searchQuery ? onClearSearch : addProject}
          />
        ) : (
          projects.map((proj, projIdx) => {
            const isExpanded = expandedProjects[proj.id] ?? true;
            return (
              <M3Card
                key={proj.id}
                variant="elevated"
                className="overflow-hidden p-0 transition-all border border-slate-700/15"
              >
                {/* Project Header Bar */}
                <div
                  onClick={() => toggleProjectExpand(proj.id)}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                    isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {projIdx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base truncate">
                          {proj.title || 'Untitled Project'}
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20 shrink-0">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-md">
                        {proj.description || 'No description added'}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <M3IconButton
                      variant="standard"
                      size="sm"
                      disabled={projIdx === 0}
                      onClick={() => moveProject(projIdx, projIdx - 1)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    </M3IconButton>
                    <M3IconButton
                      variant="standard"
                      size="sm"
                      disabled={projIdx === projects.length - 1}
                      onClick={() => moveProject(projIdx, projIdx + 1)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </M3IconButton>
                    <M3IconButton
                      variant="standard"
                      size="sm"
                      onClick={() => duplicateProject(proj)}
                      title="Duplicate project"
                    >
                      <Copy className="w-4 h-4 text-slate-400 hover:text-cyan-500" />
                    </M3IconButton>
                    <M3IconButton
                      variant="standard"
                      size="sm"
                      onClick={() => removeProject(projIdx)}
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                    </M3IconButton>
                  </div>
                </div>

                {/* Project Expanded Form Body */}
                {isExpanded && (
                  <div className="p-6 sm:p-7 pt-2 space-y-5 border-t border-slate-700/10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="sm:col-span-2">
                        <M3TextField
                          label="Project Title"
                          value={proj.title}
                          onChange={(val) => updateProjectField(projIdx, 'title', val)}
                          placeholder="e.g. Distributed Mesh Cache"
                        />
                      </div>

                      <div className="flex items-center justify-between sm:justify-center p-2 rounded-2xl border border-slate-700/10">
                        <M3Switch
                          checked={!!proj.featured}
                          onChange={(checked) => updateProjectField(projIdx, 'featured', checked)}
                          label="Feature on Hero"
                        />
                      </div>
                    </div>

                    <M3TextField
                      label="Architectural Problem & Outcome"
                      value={proj.description}
                      onChange={(val) => updateProjectField(projIdx, 'description', val)}
                      multiline
                      rows={3}
                      placeholder="Explain the architectural challenge, scale constraints, throughput metrics, and user impact..."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <M3TextField
                        label="Live Interactive URL"
                        value={proj.liveUrl || ''}
                        onChange={(val) => updateProjectField(projIdx, 'liveUrl', val)}
                        placeholder="https://..."
                        errorText={
                          proj.liveUrl && !/^https?:\/\//.test(proj.liveUrl)
                            ? 'Must start with https://'
                            : undefined
                        }
                      />
                      <M3TextField
                        label="Source Code Repo URL"
                        value={proj.repoUrl || ''}
                        onChange={(val) => updateProjectField(projIdx, 'repoUrl', val)}
                        placeholder="https://github.com/..."
                        errorText={
                          proj.repoUrl && !/^https?:\/\//.test(proj.repoUrl)
                            ? 'Must start with https://'
                            : undefined
                        }
                      />
                    </div>

                    {/* Technologies & Focus Tags with Generous Spacing */}
                    <div className="pt-2">
                      <span className="block text-xs font-mono font-bold tracking-wider mb-2 uppercase text-slate-500 dark:text-slate-400">
                        Technologies & System Tags
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {proj.tags.map((tag, tIdx) => (
                          <M3Chip
                            key={tIdx}
                            variant="input"
                            label={tag}
                            onRemove={() => {
                              const newTags = proj.tags.filter((_, i) => i !== tIdx);
                              updateProjectField(projIdx, 'tags', newTags);
                            }}
                          />
                        ))}

                        <input
                          type="text"
                          placeholder="+ Add tag (Enter)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val && !proj.tags.includes(val)) {
                                updateProjectField(projIdx, 'tags', [...proj.tags, val]);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          className={`text-xs px-3.5 py-1.5 rounded-full border border-dashed font-mono focus:outline-none transition-all ${
                            isDark
                              ? 'bg-transparent border-slate-700 text-slate-300 focus:border-cyan-500'
                              : 'bg-transparent border-slate-300 text-slate-700 focus:border-cyan-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </M3Card>
            );
          })
        )}
      </div>

      {projects.length > 0 && (
        <div className="flex justify-center pt-2">
          <M3Button
            variant="tonal"
            icon={<Plus className="w-4 h-4" />}
            onClick={addProject}
          >
            Add Another Project
          </M3Button>
        </div>
      )}
    </div>
  );
};
