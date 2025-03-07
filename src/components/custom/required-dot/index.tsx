import { cn } from "@/components/lib/utils";

function RequiredDot({ dotClassName }: { dotClassName?: string }) {
  return (
    <span
      className={cn(
        "absolute w-2 h-2 rounded-full bg-red-500 top-[0.1rem] right-[-0.6rem] ",
        dotClassName
      )}
    />
  );
}

export default RequiredDot;
