"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAddFormSchema } from "@/lib/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RequiredDot from "@/components/custom/required-dot";
import FormActionButtons from "../action-buttons";
import { useAddUser } from "@/hooks/useAddUser";
import InputHideButton from "@/components/custom/button/input-hide";
import { useAddUserFormInputHide } from "@/hooks/useAddUserFormInputHide";
import { useErrorStore } from "@/lib/stores";

type UserAddFormProps = {
  onClose: () => void;
};

function UserAddForm({ onClose }: UserAddFormProps) {
  const setError = useErrorStore((state) => state.setError);

  const form = useForm<z.infer<typeof userAddFormSchema>>({
    resolver: zodResolver(userAddFormSchema),
    defaultValues: {
      email: "",
      password: "",
      repeat_password: "",
      name: "",
    },
  });

  const {
    showPassword,
    showRepeatPassword,
    handleShowPasswordClick,
    handleShowRepeatPasswordClick,
  } = useAddUserFormInputHide();

  const { handleSubmit } = useAddUser();

  const onSubmit = async (values: z.infer<typeof userAddFormSchema>) => {
    const response = await fetch(`/api/users/${values.email}/exists`);
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "이메일 중복 체크 실패");
      return;
    }
    const { result } = (await response.json()) as { result: boolean };

    if (result) {
      form.setError("email", {
        message: "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.",
      });
      return;
    }
    await handleSubmit(values);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md relative w-fit">
                아이디(이메일)
                <RequiredDot />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-100"
                  minLength={9}
                  maxLength={50}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md relative w-fit">
                비밀번호
                <RequiredDot />
              </FormLabel>
              <FormControl>
                <div className="relative w-fit flex-row overflow-hidden">
                  <Input
                    {...field}
                    className="w-100"
                    placeholder="영문, 숫자, 특수문자 조합 8~15자"
                    minLength={8}
                    maxLength={15}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputHideButton
                    show={showPassword}
                    onClick={handleShowPasswordClick}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeat_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md relative w-fit">
                비밀번호 확인
                <RequiredDot />
              </FormLabel>
              <FormControl>
                <div className="relative w-fit flex-row overflow-hidden">
                  <Input
                    {...field}
                    className="w-100"
                    type={showRepeatPassword ? "text" : "password"}
                  />
                  <InputHideButton
                    show={showRepeatPassword}
                    onClick={handleShowRepeatPasswordClick}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md relative w-fit">
                이름
                <RequiredDot />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-100"
                  minLength={1}
                  maxLength={16}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full h-[1px] bg-gray-200" />
        <FormActionButtons onCancel={onClose} submitText="생성" />
      </form>
    </Form>
  );
}

export default UserAddForm;
