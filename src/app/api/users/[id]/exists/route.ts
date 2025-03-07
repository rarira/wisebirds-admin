import { NextRequest, NextResponse } from "next/server";
import { checkEmailExits } from "@/lib/json-server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = await params;

  try {
    // JSON 파일로 backend 임시 구현
    const result = await checkEmailExits(email);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
