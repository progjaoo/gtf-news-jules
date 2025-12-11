import React from 'react';

interface AdBannerProps {
  text?: string;
}

export function AdBanner({ text = "CLIQUE E ANUNCIE AQUI" }: AdBannerProps) {
  return (
    <div className="
        ad-banner
        w-full 
        max-w-[1366px] 
        h-[177px] 
        mx-auto 
        my-6 
        flex 
        items-center 
        justify-center 
        text-lg 
        font-bold 
        rounded-md
        cursor-pointer 
        hover:opacity-90 
        transition-opacity
      ">
      {text}
    </div>
  );
}
