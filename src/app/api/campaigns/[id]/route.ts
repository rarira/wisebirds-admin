import { NextRequest, NextResponse } from "next/server";
import { updateDataFromJsonServer } from "@/lib/json-server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, props: Props) {
  const { id } = await props.params;
  const body = await req.json();

  if (!body.enabled || typeof body.enabled !== "boolean") {
    return NextResponse.json(
      { message: "boolean 값인 enabled 필드가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    // JSON 파일로 backend 임시 구현
    await updateDataFromJsonServer("campaigns", +id, body);
    return NextResponse.json({ result: body.enabled, id });
  } catch (error) {
    console.error("업데이트 오류:", error);
    return NextResponse.json({ message: "업데이트 실패" }, { status: 500 });
  }
}
