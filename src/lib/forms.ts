import { z } from "zod";

const koreanEnglishRegex = /^[가-힣a-zA-Z]+$/;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|<>?{}]).{8,15}$/;

export const userEditFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력하세요")
    .max(16, `이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)`)
    .regex(
      koreanEnglishRegex,
      `이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)`
    ),
});

export const userAddFormSchema = userEditFormSchema
  .extend({
    email: z
      .string()
      .trim()
      .min(1, `아이디(이메일)을 입력하세요`)
      .min(9, `올바린 이메일 주소를 입력하세요`)
      .max(50, `올바린 이메일 주소를 입력하세요`)
      .email(`올바린 이메일 주소를 입력하세요`),
    password: z
      .string()
      .min(1, "비밀번호를 입력하세요")
      .min(8, "8~15자 영문, 숫자, 특수문자를 사용하세요")
      .max(15, "8~15자 영문, 숫자, 특수문자를 사용하세요")
      .regex(passwordRegex, "8~15자 영문, 숫자, 특수문자를 사용하세요"),
    repeat_password: z.string().min(1, "비밀번호를 입력하세요"),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["repeat_password"], // 오류가 발생한 필드 지정
  });
