import React from 'react';
import { SocialLink } from '../../../types/portfolio';
import { M3Card, M3TextField, M3Button, M3IconButton } from '../../m3';
import { Share2, Plus, Trash2, Github, Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';

interface SocialsSectionProps {
  socials: SocialLink[];
  onChange: (updatedSocials: SocialLink[]) => void;
  isDark?: boolean;
}

const POPULAR_SOCIAL_PLATFORMS = [
  { name: 'GitHub', icon: Github, defaultUrl: 'https://github.com/' },
  { name: 'LinkedIn', icon: Linkedin, defaultUrl: 'https://linkedin.com/in/' },
  { name: 'X / Twitter', icon: Twitter, defaultUrl: 'https://x.com/' },
  { name: 'Website', icon: Globe, defaultUrl: 'https://' },
];

export const SocialsSection: React.FC<SocialsSectionProps> = ({
  socials,
  onChange,
  isDark = true,
}) => {
  const addSocial = (platform: string = 'GitHub', url: string = 'https://github.com/') => {
    const newSocial: SocialLink = { platform, url };
    onChange([...socials, newSocial]);
  };

  const removeSocial = (idx: number) => {
    onChange(socials.filter((_, i) => i !== idx));
  };

  const updateSocial = (idx: number, field: keyof SocialLink, val: string) => {
    const updated = [...socials];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl border border-slate-700/10 bg-slate-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-500 font-bold">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold">
              Online Presences ({socials.length} Links)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct links to your code repositories, professional networks, and articles
            </p>
          </div>
        </div>

        <M3Button
          variant="filled"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => addSocial()}
        >
          Add Profile
        </M3Button>
      </div>

      {/* Quick 1-Click Platform Adders */}
      <M3Card variant="filled" className="p-5 space-y-3 border border-slate-700/10">
        <span className="block text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          Quick-Add Supported Developer Platforms:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_SOCIAL_PLATFORMS.map((plat) => {
            const Icon = plat.icon;
            return (
              <button
                key={plat.name}
                onClick={() => addSocial(plat.name, plat.defaultUrl)}
                className="px-3.5 py-2 rounded-2xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors cursor-pointer bg-white dark:bg-[#121824]"
              >
                <Icon className="w-4 h-4 text-purple-500" />
                <span>+ {plat.name}</span>
              </button>
            );
          })}
        </div>
      </M3Card>

      {/* Social Links List */}
      <div className="space-y-4">
        {socials.map((social, sIdx) => (
          <M3Card
            key={sIdx}
            variant="elevated"
            className="p-5 flex items-center gap-4 border border-slate-700/15"
          >
            <div className="w-1/3 min-w-[120px]">
              <M3TextField
                label="Platform Name"
                value={social.platform}
                onChange={(val) => updateSocial(sIdx, 'platform', val)}
                placeholder="e.g. GitHub"
              />
            </div>

            <div className="flex-1">
              <M3TextField
                label="Profile URL"
                value={social.url}
                onChange={(val) => updateSocial(sIdx, 'url', val)}
                placeholder="https://..."
                trailingIcon={
                  social.url && /^https?:\/\//.test(social.url) ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-purple-500"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : undefined
                }
              />
            </div>

            <M3IconButton
              variant="standard"
              size="sm"
              onClick={() => removeSocial(sIdx)}
              title="Delete social link"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
            </M3IconButton>
          </M3Card>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <M3Button
          variant="tonal"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => addSocial()}
        >
          Add Another Link
        </M3Button>
      </div>
    </div>
  );
};
