import { cn } from "@/components/lib/utils";
import { IoMdClose } from "react-icons/io";

type ModalCloseButtonProps = {
  onClick: () => void;
  className?: string;
};

function ModalCloseButton({ onClick, className }: ModalCloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn("absolute top-4 right-4", className)}
    >
      <IoMdClose size={24} />
    </button>
  );
}

export default ModalCloseButton;
