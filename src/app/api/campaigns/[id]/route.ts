import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    // TODO: 백엔드 구현 필요

    return NextResponse.json({ result: body.enabled, id });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
