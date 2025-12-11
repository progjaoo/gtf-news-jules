import { TopHeader } from "./TopHeader";
import { EditorialBar } from "./EditorialBar";
import { CategoryNav } from "./CategoryNav";

export function StickyHeader() {
  return (
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
      <TopHeader />
      <EditorialBar />
      <CategoryNav />
    </div>
  );
}
