import { z } from "zod";

const koreanEnglishRegex = /^[가-힣a-zA-Z]+$/;

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
