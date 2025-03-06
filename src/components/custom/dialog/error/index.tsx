"use client";
import { QueryErrorResetFunction } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ErrorDialogProps = {
  error: Error;
  resetErrorBoundary: QueryErrorResetFunction;
};

function ErrorDialog({ resetErrorBoundary }: ErrorDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    resetErrorBoundary();
    router.refresh();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start bg-black/20 z-100">
        <div className="bg-white p-6 rounded-md shadow-lg w-120 mt-8">
          <p className="text-gray-700 mb-2">
            에러가 발생했습니다
            <br />
            같은 현상이 반복되면 고객센터로 문의 바랍니다
          </p>

          <p className="text-gray-700">
            고객센터
            <br />- email:{" "}
            <a href="mailto:helpcenter@wisebirds.ai" className="text-primary">
              helpcenter@wisebirds.ai
            </a>
          </p>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorDialog;
