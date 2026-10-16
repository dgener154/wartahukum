import React from 'react';
import { WartaHukumLogo } from './WartaHukumLogo';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
  variant?: 'masthead' | 'header' | 'compact' | 'footer';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  variant,
  className = '',
}) => {
  const chosenVariant =
    variant || (size === 'sm' ? 'compact' : size === 'lg' ? 'footer' : 'header');

  return (
    <div className={`inline-block ${className}`}>
      <WartaHukumLogo variant={chosenVariant} showTagline={showTagline} />
    </div>
  );
};
