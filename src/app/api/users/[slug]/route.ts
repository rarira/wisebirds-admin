import { NextRequest, NextResponse } from "next/server";
import { updateDataFromJsonServer } from "@/lib/json-server";
import { userEditFormSchema } from "@/lib/forms";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function PATCH(req: NextRequest, props: Props) {
  const { slug: id } = await props.params;
  const body = await req.json();

  const result = userEditFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "유효하지 않은 입력 값입니다." },
      { status: 400 }
    );
  }

  try {
    // JSON 파일로 backend 임시 구현
    await updateDataFromJsonServer("users", +id, body);
    return NextResponse.json({ result: true, id });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
