"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useInvitationActions } from "../hooks/use-invitation-actions";
import type { InvitationEvent } from "../types";

interface InvitationActionsProps {
  invitation: InvitationEvent;
}

export function InvitationActions({ invitation }: InvitationActionsProps) {
  const { notice, saveToCalendar, shareInvitation } = useInvitationActions(invitation);

  return (
    <>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Button
          className="min-h-10 rounded-full border-[#9d6663] bg-[#9d6663] px-2 py-1.5 text-[0.58rem] text-[#fffdf9] hover:bg-[#865250] sm:text-[0.66rem]"
          onClick={shareInvitation}
          type="button"
        >
          اشتراک‌گذاری دعوت‌نامه
          <span aria-hidden="true">↗</span>
        </Button>
        <Button
          className="min-h-10 rounded-full border-[#d19a91]/55 bg-transparent px-2 py-1.5 text-[0.58rem] text-[#69494a] hover:border-[#9d6663] hover:bg-[#fffdf9]/75 sm:text-[0.66rem]"
          onClick={saveToCalendar}
          type="button"
          variant="outline"
        >
          ذخیره تاریخ در تقویم
          <span aria-hidden="true">＋</span>
        </Button>
      </div>
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed right-1/2 bottom-6 z-30 translate-x-1/2 translate-y-3 rounded-full border border-white/20 bg-[#69494a]/95 px-4 py-2.5 text-xs text-[#fffdf9] opacity-0 shadow-xl transition",
          notice && "translate-y-0 opacity-100"
        )}
        role="status"
      >
        {notice}
      </div>
    </>
  );
}
