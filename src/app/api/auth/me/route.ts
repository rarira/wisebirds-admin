import { sleep } from "@/lib/utils";

export async function GET() {
  console.log("call me api");
  //TODO: 백엔드 구현 필요
  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-Key": process.env.DATA_API_KEY,
  //     },
  //   });
  //   const data = await res.json();
  //   return Response.json(data);

  await sleep(1000);

  return Response.json({
    id: 1,
    email: "abc@abc.com",
    name: "홍길동",
    company: {
      id: 1,
      name: "와이즈버즈",
    },
  });
}
