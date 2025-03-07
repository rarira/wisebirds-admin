type FormActionButtonsProps = {
  onCancel: () => void;
  submitText: string;
};

function FormActionButtons({ onCancel, submitText }: FormActionButtonsProps) {
  return (
    <div className="flex flex-row w-full justify-center gap-3  items-center">
      <button onClick={onCancel} className="px-3 py-2 rounded-sm bg-gray-200">
        취소
      </button>
      <button
        type="submit"
        className="px-3 py-2 rounded-sm bg-primary text-white"
      >
        {submitText}
      </button>
    </div>
  );
}

export default FormActionButtons;
