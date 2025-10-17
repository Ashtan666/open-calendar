import { Puzzle } from "lucide-react";
import { ReactNode } from "react";

interface ComingSoonButtonProps {
  children: ReactNode;
  message?: String;
}

export const ComingSoonButton = ({
  children,
  message = "Coming Soon",
}: ComingSoonButtonProps) => {
  return (
    <div className="relative pointer-events-none opacity-80">
      <div className="blur-[1px] select-none">{children}</div>
      <div className="rounded-md scale-150 scale-125 absolute inset-0 flex flex-row flex-nowrap items-center justify-center bg-blue-50/70 backdrop-blur-sm pr-2 border border-indigo-300">
        <Puzzle className="w-3 h-3 text-indigo-500/90 mr-1" />
        <span className="text-indigo-500/90 font-medium text-xs">
          {message}
        </span>
      </div>
    </div>
  );
};
