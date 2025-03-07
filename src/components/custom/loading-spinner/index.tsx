import { cn } from "@/components/lib/utils";
import { ClassValue } from "clsx";
import { BeatLoader } from "react-spinners";

type LoadingSpinnerProps = {
  color?: string;
  size?: number;
  containerClassName?: ClassValue[];
};

function LoadingSpinner({
  size = 12,
  color = "#2b77fb",
  containerClassName,
}: LoadingSpinnerProps) {
  return (
    <div className={cn(containerClassName)}>
      <BeatLoader color={color} size={size} loading={true} />
    </div>
  );
}

export default LoadingSpinner;
