import React from 'react';
import { PortfolioData, TemplateId } from '../../types/portfolio';
import { TerminalDarkTemplate } from './TerminalDarkTemplate';
import { MinimalSlateTemplate } from './MinimalSlateTemplate';
import { CreativeGridTemplate } from './CreativeGridTemplate';
import { ModernBentoTemplate } from './ModernBentoTemplate';

interface TemplateRendererProps {
  data: PortfolioData;
  overrideTemplateId?: TemplateId;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  data,
  overrideTemplateId,
}) => {
  const currentTemplate = overrideTemplateId || data.meta.templateId || 'modern-bento';
  const primaryColor = data.meta.theme.primaryColor || '#6366f1';
  const font = data.meta.theme.font || 'Inter';

  const fontStyle = {
    fontFamily: `${font}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    '--accent-color': primaryColor,
  } as React.CSSProperties;

  const renderContent = () => {
    switch (currentTemplate) {
      case 'terminal-dark':
        return <TerminalDarkTemplate data={data} />;
      case 'minimal-slate':
        return <MinimalSlateTemplate data={data} />;
      case 'creative-grid':
        return <CreativeGridTemplate data={data} />;
      case 'modern-bento':
      default:
        return <ModernBentoTemplate data={data} />;
    }
  };

  return (
    <div style={fontStyle} className="w-full h-full">
      {renderContent()}
    </div>
  );
};
