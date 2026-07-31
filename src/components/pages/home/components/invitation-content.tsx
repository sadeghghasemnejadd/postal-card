import Image from "next/image";

import desktopBackground from "@/docs/assets/pearl-bg-desktop.webp";
import mobileBackground from "@/docs/assets/pearl-bg-mobile.webp";

import type { InvitationEvent } from "../types";
import { Countdown } from "./countdown";
import { InvitationActions } from "./invitation-actions";

interface InvitationContentProps {
  invitation: InvitationEvent;
}

export function InvitationContent({ invitation }: InvitationContentProps) {
  return (
    <section
      aria-labelledby="couple-names"
      className="relative isolate flex min-h-svh flex-col items-center overflow-clip bg-gradient-to-br from-[#fffdfb] via-[#fff7ee] to-[#f9ded9] px-6 py-16 text-center sm:py-20"
    >
      <Image
        alt=""
        aria-hidden="true"
        className="-z-20 hidden animate-pulse object-cover object-center [animation-duration:24s] sm:block"
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={desktopBackground}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="-z-20 animate-pulse object-cover object-center [animation-duration:24s] sm:hidden"
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={mobileBackground}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#fffdfb]/42 via-[#fff8f3]/65 to-[#f9e5de]/52 mix-blend-multiply" />
      <div className="pointer-events-none absolute top-[7%] left-[12%] -z-10 size-72 rounded-full bg-[#ffe6e9]/55 blur-3xl" />
      <div className="pointer-events-none absolute right-[9%] bottom-[5%] -z-10 size-80 rounded-full bg-[#f6ddd2]/55 blur-3xl" />

      <Image
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-1/2 bottom-0 -z-10 w-[min(115vw,560px)] translate-x-1/2 opacity-[0.07] mix-blend-multiply sepia sm:w-[min(55vw,700px)] sm:opacity-10"
        height={1536}
        priority
        sizes="(max-width: 700px) 115vw, 700px"
        src="/images/wedding-couple-silhouette.png"
        width={1024}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] left-[9%] text-xl text-[#d19a91]/50"
      >
        ✦
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[37%] right-[7%] text-[#d19a91]/45"
      >
        ❦
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[14%] bottom-[19%] text-sm text-[#d19a91]/55"
      >
        ✧
      </span>

      <article className="relative z-10 my-auto flex w-full max-w-135 flex-col items-center">
        <span
          aria-hidden="true"
          className="mb-5 grid size-11 place-items-center rounded-full border border-[#d19a91]/30 bg-[#fffdf9]/40 text-[#b97f79] shadow-[0_9px_24px_rgba(105,73,74,0.08)]"
        >
          ❦
        </span>

        <p className="mb-2 text-[clamp(.7rem,1.4vw,.84rem)] tracking-[.04em] text-[#987573]">
          به نام آن‌که عشق را آفرید
        </p>

        <h1
          className="flex flex-wrap items-center justify-center gap-x-3 [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[clamp(2rem,7vw,4rem)] leading-[1.55] font-semibold text-[#9d6663] drop-shadow-sm"
          id="couple-names"
        >
          <span>{invitation.brideName}</span>
          <b className="text-[.55em] font-medium text-[#d19a91]">و</b>
          <span>{invitation.groomName}</span>
        </h1>

        <div
          aria-hidden="true"
          className="my-3 grid w-[min(72%,280px)] grid-cols-[1fr_auto_1fr] items-center gap-3 text-[.7rem] text-[#d19a91]"
        >
          <i className="h-px bg-gradient-to-r from-transparent to-[#d19a91]" />
          <span>◇</span>
          <i className="h-px scale-x-[-1] bg-gradient-to-r from-transparent to-[#d19a91]" />
        </div>

        <p className="max-w-105 text-balance text-[clamp(.78rem,1.6vw,.94rem)] leading-8 text-[#876a68]">
          با قلبی سرشار از مهر، شما را به تماشای آغاز فصل مشترک
          زندگی‌مان دعوت می‌کنیم.
        </p>

        <div
          aria-label="تاریخ مراسم"
          className="mt-7 grid w-full max-w-90 grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-[#9d6663]/25 py-3 text-[clamp(.72rem,1.5vw,.88rem)] text-[#987573]"
        >
          <span>{invitation.weekday}</span>
          <time
            className="text-2xl font-medium tracking-[.08em] text-[#69494a]"
            dateTime={invitation.eventDate}
          >
            {invitation.day}
          </time>
          <span>{invitation.monthAndYear}</span>
        </div>

        <p className="mt-4 rounded-full border border-[#d19a91]/30 bg-[#fffdf9]/40 px-5 py-1.5 text-[clamp(.7rem,1.4vw,.82rem)] text-[#8b5355] shadow-[0_7px_20px_rgba(105,73,74,0.05)]">
          {invitation.eventTime}
        </p>

        <div className="w-full max-w-100">
          <Countdown eventDate={invitation.eventDate} />
          <InvitationActions invitation={invitation} />
        </div>

        <div className="mt-7 flex flex-col items-center">
          <p className="mb-1 text-[clamp(.66rem,1.3vw,.77rem)] text-[#987573]">
            بودنتان، گرمای این خاطره خواهد بود
          </p>
          <p className="m-0 [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[clamp(1.1rem,2.4vw,1.45rem)] leading-7 font-semibold text-[#9d6663]">
            {invitation.brideName} و {invitation.groomName}
          </p>
        </div>
      </article>
    </section>
  );
}
