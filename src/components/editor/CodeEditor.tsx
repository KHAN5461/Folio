import React from 'react';
import { JsonCodeEditor } from '../studio/JsonCodeEditor';
import { PortfolioData } from '../../types/portfolio';

export interface CodeEditorProps {
  data: PortfolioData;
  theme: 'dark' | 'light';
  onChange: (updated: PortfolioData) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  return <JsonCodeEditor {...props} />;
};

export default CodeEditor;
