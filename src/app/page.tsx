"use client";

import HomeView from "@/components/custom/view/home";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-between mt-4 gap-4">
      <Suspense fallback={<div>로딩 중입니다...</div>}>
        <HomeView />
      </Suspense>
    </div>
  );
}
