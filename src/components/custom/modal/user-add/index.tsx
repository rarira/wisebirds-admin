import Modal from "..";
import ModalCloseButton from "@/components/custom/button/modal-close";
import UserAddForm from "@/components/custom/form/user-add";

type UserAddModalProps = {
  setOpen: (open: boolean) => void;
};

function UserAddModal({ setOpen }: UserAddModalProps) {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal modalClassName="grow-1 w-1/2 h-fit max-w-140 min-w-120 relative">
      <h2 className="text-xl font-extrabold mb-6">사용자 생성</h2>
      <UserAddForm onClose={closeModal} />
      <ModalCloseButton onClick={closeModal} />
    </Modal>
  );
}

export default UserAddModal;
