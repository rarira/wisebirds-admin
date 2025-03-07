import { cn } from "@/components/lib/utils";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type InputHideButtonProps = {
  show: boolean;
  onClick: () => void;
  className?: string;
};

function InputHideButton({ show, onClick, className }: InputHideButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 right-0 p-2 h-full translate-y-[-50%] rounded-r-md bg-gray-100 cursor-pointer",
        className
      )}
    >
      {show ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
    </button>
  );
}

export default InputHideButton;
