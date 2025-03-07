import { cn } from "@/components/lib/utils";

type ModalProps = {
  children: React.ReactNode;
  modalClassName?: string;
};

function Modal({ children, modalClassName }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start bg-black/20 z-100">
      <div
        className={cn(
          "bg-white p-6 rounded-md shadow-lg w-120 mt-8",
          modalClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
