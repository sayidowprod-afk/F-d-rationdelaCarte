"use client";

import dynamic from "next/dynamic";
import type { Member } from "@/lib/types";

const MembersMap = dynamic(() => import("./MembersMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center rounded-2xl border border-border-subtle text-sm text-zinc-500">
      Chargement de la carte...
    </div>
  ),
});

export default function MembersMapLoader({ members }: { members: Member[] }) {
  return <MembersMap members={members} />;
}
