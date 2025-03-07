import { NextRequest, NextResponse } from "next/server";
import { checkEmailExits } from "@/lib/json-server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_req: NextRequest, props: Props) {
  const { slug: email } = await props.params;

  try {
    // JSON 파일로 backend 임시 구현
    const result = await checkEmailExits(email);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
