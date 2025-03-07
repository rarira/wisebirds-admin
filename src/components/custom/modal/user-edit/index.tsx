import { UserContent } from "@/lib/types";
import UserEditForm from "@/components/custom/form/user-edit";
import Modal from "..";
import RequiredDot from "../../required-dot";
import ModalCloseButton from "../../button/modal-close";

type UserEditModalProps = {
  row: UserContent;
  setOpen: (open: boolean) => void;
};

function UserEditModal({ row, setOpen }: UserEditModalProps) {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal modalClassName="grow-1 w-1/2 h-fit max-w-140 min-w-120 relative">
      <h2 className="text-xl font-extrabold mb-6">사용자 수정</h2>
      <div className="flex flex-col gap-1 mb-4">
        <div className="relative w-fit text-md font-bold">
          아이디
          <RequiredDot />
        </div>
        <div className="text-md">{row.email}</div>
      </div>
      <UserEditForm onClose={closeModal} username={row.name} />
      <ModalCloseButton onClick={closeModal} />
    </Modal>
  );
}

export default UserEditModal;
