import React from 'react';
import { MapPin } from 'lucide-react';

export function TopHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container flex items-center justify-between h-10">
        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">89.7</span>
          <span className="text-sm font-bold text-foreground">GTF</span>
          <span className="text-sm font-bold text-primary">NEWS</span>
          <span className="text-sm text-muted-foreground mx-1">|</span>
          <span className="text-sm font-semibold text-primary">BRASIL</span>
        </a>

        {/* Region Selector */}
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MapPin size={14} />
          <span>Rio de Janeiro</span>
        </button>
      </div>
    </header>
  );
}
