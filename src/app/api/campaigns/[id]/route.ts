import { NextRequest, NextResponse } from "next/server";
import { updateDataFromJsonServer } from "@/lib/json-server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    // JSON 파일로 backend 임시 구현
    await updateDataFromJsonServer("campaigns", +id, body);
    return NextResponse.json({ result: body.enabled, id });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
