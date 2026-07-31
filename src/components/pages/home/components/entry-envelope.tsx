"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { playBackgroundMusic } from "./background-music";
import styles from "./entry-envelope.module.css";

interface EntryEnvelopeProps {
  children: ReactNode;
}

export function EntryEnvelope({ children }: EntryEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isOpening) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const revealTimer = window.setTimeout(
      () => {
        setIsVisible(false);
        window.requestAnimationFrame(() => contentRef.current?.focus());
      },
      prefersReducedMotion ? 220 : 2_450
    );

    return () => window.clearTimeout(revealTimer);
  }, [isOpening]);

  const openEnvelope = () => {
    if (isOpening) {
      return;
    }

    playBackgroundMusic();
    setIsOpening(true);
  };

  return (
    <>
      <div
        aria-hidden={isVisible}
        className={cn(styles.content, isOpening && styles.contentRevealed)}
        inert={isVisible}
        ref={contentRef}
        tabIndex={-1}
      >
        {children}
      </div>

      {isVisible && (
        <section
          aria-label="پاکت دعوت‌نامه"
          className={styles.gate}
          data-state={isOpening ? "opening" : "sealed"}
        >
          <div aria-hidden="true" className={styles.paperTexture} />
          <div aria-hidden="true" className={styles.lightBloom} />
          <div aria-hidden="true" className={styles.glowOne} />
          <div aria-hidden="true" className={styles.glowTwo} />

          <div aria-hidden="true" className={styles.sparkles}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <header className={styles.intro}>
            <span aria-hidden="true" className={styles.introLine} />
            <span className={styles.introKicker}>یک دعوتِ عاشقانه</span>
            <span className={styles.introSubtext}>
              پاکت را باز کنید و مهمان قصه‌ی ما شوید
            </span>
          </header>

          <button
            aria-label="یک نامه‌ی ویژه برای شما رسیده؛ باز کردن پاکت دعوت‌نامه"
            className={styles.envelopeButton}
            disabled={isOpening}
            onClick={openEnvelope}
            type="button"
          >
            <span aria-hidden="true" className={styles.floorShadow} />

            <Image
              alt=""
              aria-hidden="true"
              className={styles.dove}
              height={1254}
              priority
              sizes="(max-width: 640px) 44vw, 290px"
              src="/images/messenger-dove.png"
              width={1254}
            />

            <span className={styles.envelope}>
              <span aria-hidden="true" className={styles.envelopeBack} />

              <span aria-hidden="true" className={styles.letter}>
                <span className={styles.letterBorder} />
                <span className={styles.letterInner}>
                  <span className={styles.letterOrnament}>❦</span>
                  <span className={styles.letterTitle}>
                    <b>محمد صادق</b>
                    <i>و</i>
                    <b>فاطمه</b>
                  </span>
                  <span className={styles.letterDivider}>
                    <i />
                    <b>◇</b>
                    <i />
                  </span>
                  <span className={styles.letterText}>آغاز قصه‌ی ما</span>
                </span>
              </span>

              <span aria-hidden="true" className={styles.flap}>
                <span className={styles.flapHighlight} />
              </span>

              <span aria-hidden="true" className={styles.leftFold} />
              <span aria-hidden="true" className={styles.rightFold} />
              <span aria-hidden="true" className={styles.bottomFold} />
              <span aria-hidden="true" className={styles.foldShine} />

              <span aria-hidden="true" className={styles.envelopeMessage}>
                یک نامه‌ی ویژه برای شما رسیده
              </span>

              <span aria-hidden="true" className={styles.botanical}>
                <span className={styles.botanicalStem} />
                <i className={styles.leafOne} />
                <i className={styles.leafTwo} />
                <i className={styles.leafThree} />
                <i className={styles.leafFour} />
                <i className={styles.leafFive} />
                <i className={styles.leafSix} />
              </span>

              <span aria-hidden="true" className={styles.seal}>
                <span className={styles.sealHalo} />
                <span className={styles.sealPulse} />
                <span className={styles.sealRing} />
                <span className={styles.sealLabel}>باز کن</span>
              </span>

              <span aria-hidden="true" className={styles.postmark}>
                <i>با عشق</i>
                <b>برای شما</b>
              </span>
            </span>
          </button>

        </section>
      )}
    </>
  );
}
