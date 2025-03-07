import { useState } from "react";

export function useAddUserFormInputHide() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleShowPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const handleShowRepeatPasswordClick = () => {
    setShowRepeatPassword((state) => !state);
  };

  return {
    showPassword,
    showRepeatPassword,
    handleShowPasswordClick,
    handleShowRepeatPasswordClick,
  };
}
