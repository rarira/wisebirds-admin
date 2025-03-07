"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/custom/modal";

function NoAccessDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Modal>
      <h2 className="text-xl font-extrabold text-destructive mb-6">
        접근 권한 없음
      </h2>

      <p className="text-gray-700 mb-2">
        아래 닫기 버튼을 누르시면 홈페이지로 돌아깁니다.
      </p>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default NoAccessDialog;
