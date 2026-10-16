import React from 'react';
import { RedaksiDashboard } from './RedaksiDashboard';
import { Article } from '../../types';

interface GuruDashboardProps {
  onBackToPublic: () => void;
  onPreviewArticle?: (article: Article) => void;
  onSwitchToAdmin?: () => void;
}

export const GuruDashboard: React.FC<GuruDashboardProps> = (props) => {
  return <RedaksiDashboard {...props} />;
};

export { RedaksiDashboard };
