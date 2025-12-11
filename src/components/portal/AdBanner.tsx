import React from 'react';

interface AdBannerProps {
  text?: string;
}

export function AdBanner({ text = "CLIQUE E ANUNCIE AQUI" }: AdBannerProps) {
  return (
    <div className="ad-banner cursor-pointer hover:opacity-90 transition-opacity">
      {text}
    </div>
  );
}
