import React from 'react';
import { PortfolioBasics } from '../../../types/portfolio';
import { M3Card, M3TextField } from '../../m3';
import { User, MapPin, Link2 } from 'lucide-react';

interface IdentitySectionProps {
  basics: PortfolioBasics;
  onChange: (updatedBasics: PortfolioBasics) => void;
  isDark?: boolean;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({
  basics,
  onChange,
  isDark = true,
}) => {
  const updateField = (field: keyof PortfolioBasics, value: any) => {
    onChange({
      ...basics,
      [field]: value,
    });
  };

  const updateLocation = (field: 'city' | 'country', value: string) => {
    onChange({
      ...basics,
      location: {
        ...basics.location,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Primary Details Card */}
      <M3Card variant="elevated" className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-700/10">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-500 font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">Core Coordinates</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The primary display title, role, and bio presented at the top of your portfolio
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <M3TextField
              label="Full Display Name"
              value={basics.name}
              onChange={(val) => updateField('name', val)}
              placeholder="e.g. Alex Rivera"
              helperText="How your name appears on your headline"
            />

            <M3TextField
              label="Professional Headline"
              value={basics.headline}
              onChange={(val) => updateField('headline', val)}
              placeholder="e.g. Staff Distributed Systems Engineer"
              helperText="One-liner summarizing your role and specialty"
            />
          </div>

          <M3TextField
            label="Executive Narrative & Bio"
            value={basics.bio}
            onChange={(val) => updateField('bio', val)}
            multiline
            rows={4}
            placeholder="Tell your professional story: architectural philosophies, major systems scaled, and engineering passions..."
            helperText="Aim for 2-4 sentences with strong impact"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <M3TextField
              label="Primary Contact Email"
              type="email"
              value={basics.email}
              onChange={(val) => updateField('email', val)}
              placeholder="you@domain.com"
              errorText={
                basics.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email)
                  ? 'Please enter a valid email format'
                  : undefined
              }
            />

            <div className="grid grid-cols-2 gap-3">
              <M3TextField
                label="City / Hub"
                value={basics.location.city}
                onChange={(val) => updateLocation('city', val)}
                placeholder="San Francisco"
              />
              <M3TextField
                label="Country"
                value={basics.location.country}
                onChange={(val) => updateLocation('country', val)}
                placeholder="USA"
              />
            </div>
          </div>
        </div>
      </M3Card>

      {/* Media & External Document Links Card */}
      <M3Card variant="elevated" className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-700/10">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-500 font-bold">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">Avatar & Resume Media</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct URLs to your high-resolution profile avatar and standalone PDF resume
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <M3TextField
            label="Profile Avatar URL"
            value={basics.avatarUrl || ''}
            onChange={(val) => updateField('avatarUrl', val)}
            placeholder="https://images.unsplash.com/..."
            helperText="Direct image URL (PNG, JPG, WebP)"
            errorText={
              basics.avatarUrl && !/^https?:\/\//.test(basics.avatarUrl)
                ? 'Must start with https://'
                : undefined
            }
          />

          <M3TextField
            label="Resume / CV Link (PDF)"
            value={basics.resumeUrl || ''}
            onChange={(val) => updateField('resumeUrl', val)}
            placeholder="https://.../resume.pdf"
            helperText="Direct URL or Google Drive link"
            errorText={
              basics.resumeUrl && !/^https?:\/\//.test(basics.resumeUrl)
                ? 'Must start with https://'
                : undefined
            }
          />
        </div>
      </M3Card>
    </div>
  );
};
