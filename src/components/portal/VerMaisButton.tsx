import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface VerMaisButtonProps {
  label?: string;
  onClick?: () => void;
  size?: "full" | "medium";
}

export function VerMaisButton({
  label = "Ver mais",
  onClick,
  size = "medium",
}: VerMaisButtonProps) {
  return (
    <div className="mt-3 flex justify-center">
      <button
        onClick={onClick}
        className={clsx(
          `
          inline-flex items-center justify-center gap-2
          py-2
          text-sm font-semibold
          rounded-full
          border border-border
          text-foreground
          hover:bg-gray-600 hover:text-white
          transition-colors
          `,
          size === "full" && "w-[1000px] max-w-full",
          size === "medium" && "w-[400px] max-w-full"
        )}
      >
        {label}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
