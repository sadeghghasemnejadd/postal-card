"use client";

import { useState } from "react";
import Image from "next/image";

import desktopBackground from "@/docs/assets/pearl-bg-desktop.webp";
import mobileBackground from "@/docs/assets/pearl-bg-mobile.webp";
import { cn } from "@/lib/utils";

import type { InvitationEvent } from "../types";
import { Countdown } from "./countdown";
import { InvitationActions } from "./invitation-actions";

interface InvitationHeroProps {
  invitation: InvitationEvent;
}

const cardFaceClass =
  "absolute inset-0 overflow-hidden rounded-[14px_19px_16px_22px] border border-[#9d6663]/50 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform-style:preserve-3d]";

export function InvitationHero({ invitation }: InvitationHeroProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      aria-labelledby="couple-names"
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-gradient-to-br from-[#fffdfb] via-[#fff7ee] to-[#f9ded9] px-6 pt-9 pb-20"
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#fff8f6]/35 to-[#ffe8e1]/30 mix-blend-multiply" />
      <Image
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-0 right-1/2 -bottom-[8%] w-[min(112vw,530px)] translate-x-1/2 animate-pulse opacity-10 mix-blend-multiply sepia sm:-bottom-[16%] sm:w-[min(58vw,680px)] sm:opacity-15 [animation-duration:15s]"
        height={1536}
        priority
        sizes="(max-width: 700px) 110vw, 680px"
        src="/images/wedding-couple-silhouette.png"
        width={1024}
      />
      <div className="pointer-events-none absolute -z-10 top-[8%] left-[17%] size-72 rounded-full bg-[#ffe6e9]/55 blur-3xl animate-pulse [animation-duration:12s]" />
      <div className="pointer-events-none absolute -z-10 right-[18%] bottom-[10%] size-72 rounded-full bg-[#ffe6e9]/55 blur-3xl animate-pulse [animation-duration:12s] [animation-delay:-5s]" />
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[28%] left-[16%] size-2.5 animate-bounce rounded-full border border-[#d19a91]/35 bg-[radial-gradient(circle_at_33%_28%,#fff_0_20%,#f9ddd5_55%,#d19a91)] shadow-lg [animation-duration:7s]" />
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[62%] right-[13%] size-1.75 animate-bounce rounded-full border border-[#d19a91]/35 bg-[#f5d9d3] [animation-delay:1s] [animation-duration:9s]" />
      <span aria-hidden="true" className="pointer-events-none absolute z-0 bottom-[18%] left-[24%] size-1.5 animate-bounce rounded-full border border-[#d19a91]/35 bg-[#f5d9d3] [animation-delay:2s] [animation-duration:8s]" />
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[16%] right-[28%] size-1.25 animate-bounce rounded-full bg-[#f0cbc7] [animation-duration:7s]" />
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[20%] left-[9%] animate-pulse text-xl text-[#d19a91]/55 [animation-duration:4s]">✦</span>
      <span aria-hidden="true" className="pointer-events-none absolute z-0 right-[8%] bottom-[28%] animate-pulse text-sm text-[#d19a91]/65 [animation-delay:1s] [animation-duration:5s]">✦</span>
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[44%] left-[5%] animate-bounce text-[#d19a91]/55 [animation-delay:2s] [animation-duration:6s]">❦</span>
      <span aria-hidden="true" className="pointer-events-none absolute z-0 top-[11%] right-[13%] animate-pulse text-lg text-[#d19a91]/50 [animation-delay:2s] [animation-duration:5s]">✧</span>

      <div className="relative z-10 h-[min(76svh,650px)] w-[min(88vw,500px)] [perspective:1800px] [perspective-origin:50%_44%]">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-5 z-0 rounded-[38%] border border-[#d19a91]/25 bg-[#fffdf9]/20 blur-[1px] animate-pulse [animation-duration:8s]" />
        <div aria-hidden="true" className="pointer-events-none absolute -inset-2 z-0 rounded-[12px_25px_18px_30px] border border-[#d19a91]/30 -rotate-[2deg]" />
        <div
          className={cn(
            "absolute right-[9%] -bottom-[7%] left-[9%] z-[-1] h-[15%] rounded-[50%] bg-[#69494a]/20 blur-2xl transition-all duration-700",
            isOpen ? "translate-y-5 scale-x-[.82] opacity-45" : "translate-y-2.5 scale-x-[.92] opacity-70"
          )}
        />
        <div
          className={cn(
            "relative z-10 h-full w-full [transform-style:preserve-3d] transition-transform duration-[1150ms] ease-[cubic-bezier(.22,.9,.2,1)] will-change-transform",
            isOpen
              ? "[transform:rotateY(180deg)]"
              : "[transform:rotateX(7deg)_rotateY(-9deg)] hover:[transform:translateY(-7px)_rotateX(4deg)_rotateY(-4deg)]"
          )}
        >
          <button
            aria-controls="invitation-card"
            aria-expanded={isOpen}
            aria-label="باز کردن کارت دعوت"
            className={cn(
              cardFaceClass,
              "group grid cursor-pointer place-items-center bg-gradient-to-br from-[#edcbc7] via-[#fff9ef] to-[#efd0c9] p-6 text-center text-[#69494a] shadow-[18px_26px_48px_rgba(105,73,74,0.28)] outline-none focus-visible:ring-4 focus-visible:ring-[#d19a91]/55"
            )}
            disabled={isOpen}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.92),transparent_34%),linear-gradient(115deg,transparent_0%,rgba(255,255,255,.3)_42%,transparent_58%)] opacity-80" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 z-0 rounded-[8px_12px_10px_16px] border border-[#9d6663]/35 shadow-[inset_0_0_0_4px_rgba(255,255,255,.26)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-6 z-0 rounded-[5px_10px_7px_13px] border border-[#d19a91]/25" />
            <span aria-hidden="true" className="pointer-events-none absolute -top-[25%] -left-[44%] z-0 h-[150%] w-[20%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/65 to-transparent opacity-0 transition duration-1000 group-hover:translate-x-[620%] group-hover:opacity-100" />
            <span aria-hidden="true" className="absolute top-[9%] right-[7.5%] z-10 grid aspect-square w-[clamp(54px,8vw,76px)] place-items-center rounded-full border border-dashed border-[#9d6663]/55 bg-[#fffdf9]/20 font-serif leading-none text-[#9d6663]/70 -rotate-[18deg] shadow-[0_5px_16px_rgba(157,102,99,.12)]">
              <i className="text-[clamp(.54rem,1vw,.7rem)] not-italic">۰۵</i>
              <i className="text-[clamp(.54rem,1vw,.7rem)] not-italic">۱۴۰۵</i>
            </span>
            <span className="absolute top-[19%] left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#d19a91]/35 bg-[#fffdf9]/45 px-4 py-1.5 text-[clamp(.7rem,1.45vw,.9rem)] font-medium text-[#8b5355] shadow-[0_6px_16px_rgba(157,102,99,.12)]">
              <span>{invitation.brideName}</span>
              <i className="text-[#d19a91] not-italic">و</i>
              <span>{invitation.groomName}</span>
            </span>
            <span aria-hidden="true" className="relative z-10 grid place-items-center" dir="ltr">
              <i className="pointer-events-none absolute size-[clamp(150px,28vw,230px)] rounded-full border border-[#d19a91]/25 animate-spin [animation-duration:22s]" />
              <i className="pointer-events-none absolute size-[clamp(126px,23vw,190px)] rounded-full border border-dashed border-[#9d6663]/25 animate-spin [animation-direction:reverse] [animation-duration:17s]" />
              <span className="relative inline-flex items-center gap-[clamp(10px,2.2vw,20px)] [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[#9d6663] drop-shadow-md transition duration-500 group-hover:scale-105">
                <i className="grid aspect-square w-[clamp(57px,10vw,84px)] -translate-y-[.04em] place-items-center rounded-full border border-[#9d6663]/55 bg-[#fffdf9]/65 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[.86] not-italic shadow-[0_10px_18px_rgba(157,102,99,.18)]">M</i>
                <b className="text-[clamp(1.15rem,2.6vw,1.8rem)] font-medium text-[#d19a91] drop-shadow-sm">&amp;</b>
                <i className="grid aspect-square w-[clamp(57px,10vw,84px)] place-items-center rounded-full border border-[#9d6663]/55 bg-[#fffdf9]/65 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[.86] not-italic shadow-[0_10px_18px_rgba(157,102,99,.18)]">F</i>
              </span>
            </span>
            <span className="absolute bottom-[9%] left-1/2 z-10 flex w-[min(76%,440px)] -translate-x-1/2 flex-col items-center gap-1.5">
              <small className="rounded-full border border-[#d19a91]/30 bg-[#fffdf9]/35 px-3 py-1 text-[clamp(.61rem,1.2vw,.74rem)] tracking-[.12em] text-[#987573]">به نام عشق</small>
              <strong className="bg-gradient-to-r from-[#8b5355] via-[#c2867f] to-[#8b5355] bg-clip-text [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[clamp(1.48rem,3.6vw,2.45rem)] leading-[1.6] font-semibold text-transparent drop-shadow-sm">کارت دعوت عقد</strong>
              <span aria-hidden="true" className="flex w-[min(64%,240px)] items-center gap-2 text-[#d19a91]">
                <i className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d19a91]" />
                <b className="text-[.62rem]">✦</b>
                <i className="h-px flex-1 scale-x-[-1] bg-gradient-to-r from-transparent to-[#d19a91]" />
              </span>
              <em className="rounded-full bg-[#9d6663] px-4 py-1.5 text-[clamp(.6rem,1.15vw,.72rem)] not-italic text-[#fffdf9] shadow-[0_7px_16px_rgba(157,102,99,.22)] transition group-hover:bg-[#865250]">برای باز کردن، روی کارت بزنید</em>
            </span>
            <span aria-hidden="true" className="absolute right-[7.5%] bottom-[5%] z-10 grid w-[19%] gap-1.5 opacity-40">
              <i className="h-px bg-[#987573]" />
              <i className="h-px bg-[#987573]" />
              <i className="h-px bg-[#987573]" />
            </span>
            <span aria-hidden="true" className="absolute bottom-[9%] left-[8.5%] z-10 grid aspect-square w-[clamp(38px,5.6vw,52px)] place-items-center rounded-full border border-[#9d6663]/45 bg-[radial-gradient(circle_at_35%_30%,#fff8f2,#dca19a)] text-[clamp(1rem,2.1vw,1.45rem)] text-[#8b5355] shadow-[0_8px_16px_rgba(157,102,99,.2)] -rotate-[13deg]">❦</span>
          </button>

          <article
            aria-hidden={!isOpen}
            aria-labelledby="couple-names"
            className={cn(
              cardFaceClass,
              "grid place-items-center bg-gradient-to-br from-[#f4ded7] via-[#fffaf0] to-[#f1d7d0] p-[clamp(22px,4.2vw,42px)] text-center text-[#69494a] shadow-[-18px_26px_48px_rgba(105,73,74,0.22)] [transform:rotateY(180deg)]"
            )}
            id="invitation-card"
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[8px_12px_10px_16px] border border-[#9d6663]/30" />
            <div
              className={cn(
                "relative z-10 flex w-full max-w-142 flex-col items-center transition-all duration-700 ease-out",
                isOpen ? "translate-y-0 scale-100 opacity-100 delay-500" : "translate-y-4 scale-95 opacity-0"
              )}
            >
              <button
                aria-label="بستن کارت دعوت"
                className="absolute -top-1 -left-1 grid size-8 place-items-center rounded-full border border-[#9d6663]/40 bg-[#fffdf9]/55 text-xl leading-none text-[#9d6663] transition hover:rotate-90 hover:bg-[#9d6663] hover:text-[#fffdf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d19a91]"
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
                type="button"
              >
                ×
              </button>
              <p className="mb-0.5 text-[clamp(.64rem,1.2vw,.78rem)] text-[#987573]">به نام آن‌که عشق را آفرید</p>
              <h1 className="flex items-center justify-center gap-2 [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[clamp(1.35rem,3.15vw,2.35rem)] leading-[1.38] font-semibold text-[#9d6663] drop-shadow-sm" id="couple-names">
                <span>{invitation.brideName}</span>
                <b className="text-[.62em] font-medium text-[#d19a91]">و</b>
                <span>{invitation.groomName}</span>
              </h1>
              <div aria-hidden="true" className="my-1 grid w-[min(68%,230px)] grid-cols-[1fr_auto_1fr] items-center gap-2 text-[.68rem] text-[#d19a91]">
                <i className="h-px bg-gradient-to-r from-transparent to-[#d19a91]" />
                <span>◇</span>
                <i className="h-px scale-x-[-1] bg-gradient-to-r from-transparent to-[#d19a91]" />
              </div>
              <p className="max-w-97.5 text-balance text-[clamp(.67rem,1.25vw,.82rem)] leading-7 text-[#987573]">
                با قلبی سرشار از مهر، شما را به تماشای آغاز فصل مشترک زندگی‌مان دعوت می‌کنیم.
              </p>
              <div aria-label="تاریخ مراسم" className="mt-2 grid w-full max-w-77.5 grid-cols-[1fr_auto_1fr] items-center gap-2 border-y border-[#9d6663]/30 py-1.5 text-[clamp(.64rem,1.25vw,.8rem)] text-[#987573]">
                <span>{invitation.weekday}</span>
                <time className="text-[clamp(1.15rem,2.2vw,1.4rem)] font-medium tracking-[.08em] text-[#69494a]" dateTime={invitation.eventDate}>{invitation.day}</time>
                <span>{invitation.monthAndYear}</span>
              </div>
              <p className="mt-2 rounded-full border border-[#d19a91]/35 bg-[#fffdf9]/45 px-4 py-1 text-[clamp(.62rem,1.15vw,.74rem)] text-[#8b5355]">
                {invitation.eventTime}
              </p>
              <Countdown eventDate={invitation.eventDate} />
              <InvitationActions invitation={invitation} />
              <p className="mt-2 mb-0.5 text-[clamp(.6rem,1.1vw,.72rem)] text-[#987573]">بودنتان، گرمای این خاطره خواهد بود</p>
              <p className="m-0 [font-family:'Noto_Nastaliq_Urdu','IranNastaliq',serif] text-[clamp(.95rem,1.9vw,1.25rem)] leading-6 font-semibold text-[#9d6663]">
                {invitation.brideName} و {invitation.groomName}
              </p>
            </div>
          </article>
        </div>
      </div>

      {!isOpen && (
        <button
          className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 border-0 bg-transparent text-[.64rem] text-[#987573] animate-bounce [animation-duration:2.3s] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-[#9d6663] focus-visible:outline-offset-5"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <span>برای باز کردن کارت، لمس کنید</span>
          <i aria-hidden="true" className="text-[.95rem] not-italic text-[#9d6663]">↗</i>
        </button>
      )}
    </section>
  );
}
