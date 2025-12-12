import { useState, useEffect } from 'react';
import { TopHeader } from "./TopHeader";
import { EditorialBar } from "./EditorialBar";
import { CategoryNav } from "./CategoryNav";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TopHeader - não sticky, some ao rolar */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}
        `}
      >
        <TopHeader />
      </div>

      {/* EditorialBar + CategoryNav - sticky */}
      <div
        className="
          sticky 
          top-0 
          z-50 
          shadow-md 
          bg-background/95 
          backdrop-blur-md
        "
      >
        <EditorialBar />
        <CategoryNav />
      </div>
    </>
  );
}
