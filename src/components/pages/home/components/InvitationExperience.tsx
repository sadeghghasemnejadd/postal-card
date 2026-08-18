"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { invitation } from "@/config/invitation";

import styles from "./invitation-experience.module.css";

const IMAGE_ROOT = "/invitation/images";
const MEDIA_ROOT = "/invitation/media";
const ENVELOPE_IMAGE = `${IMAGE_ROOT}/entry-envelope.png`;
const INTRO_VIDEO = `${MEDIA_ROOT}/opening-film.mp4`;
const BACKGROUND_VIDEO = `${MEDIA_ROOT}/hero-swans.mp4`;
const BACKGROUND_AUDIO = `${MEDIA_ROOT}/background-music.mp3`;
const ARTBOARD_WIDTH = 450;
const ARTBOARD_HEIGHT = 2_153;

const ASSETS = {
  heroBackdrop: `${IMAGE_ROOT}/hero-paper.png`,
  heroLeft: `${IMAGE_ROOT}/hero-floral-left.png`,
  heroRight: `${IMAGE_ROOT}/hero-floral-right.png`,
  scrollFlourish: `${IMAGE_ROOT}/bismillah.png`,
  scheduleTop: `${IMAGE_ROOT}/schedule-top.png`,
  scheduleBottom: `${IMAGE_ROOT}/schedule-bottom.png`,
  scheduleRose: `${IMAGE_ROOT}/peony.png`,
  headingLeft: `${IMAGE_ROOT}/ornament-left.png`,
  headingRight: `${IMAGE_ROOT}/ornament-right.png`,
  locationDecor: `${IMAGE_ROOT}/location-decor.png`,
  mapGoogle: `${IMAGE_ROOT}/map-google.png`,
  mapBalad: `${IMAGE_ROOT}/map-balad.png`,
  mapNeshan: `${IMAGE_ROOT}/map-neshan.svg`,
} as const;

type SequenceState = "sealed" | "playing" | "fading" | "done";

const MAP_APPS = [
  { key: "google", title: "گوگل مپ", logo: ASSETS.mapGoogle },
  { key: "neshan", title: "نشان", logo: ASSETS.mapNeshan },
  { key: "balad", title: "بلد", logo: ASSETS.mapBalad },
] as const;

const MAP_LINKS = MAP_APPS.map((app) => ({
  ...app,
  href: invitation.venue.maps[app.key],
}));

const SPARKLES = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 27 + (index % 4) * 7) % 100,
  delay: ((index * 1.37) % 9).toFixed(2),
  duration: 12 + ((index * 3) % 8),
  size: 2 + (index % 3),
  drift: index % 2 === 0 ? 28 : -24,
}));

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const INITIAL_COUNTDOWN: CountdownValue = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getCountdown(): CountdownValue {
  const target = new Date(invitation.eventDate).getTime();
  const distance = Math.max(0, target - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function useCountdown() {
  const [countdown, setCountdown] = useState<CountdownValue>(INITIAL_COUNTDOWN);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown());
    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return countdown;
}

function formatPersianNumber(value: number, minimumIntegerDigits = 2) {
  return value.toLocaleString("fa-IR", {
    minimumIntegerDigits,
    useGrouping: false,
  });
}

function useInvitationScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(
        Math.min(1, document.documentElement.clientWidth / ARTBOARD_WIDTH),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${className} ${styles.reveal} ${isVisible ? styles.revealed : ""}`}
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Sparkles() {
  return (
    <div aria-hidden="true" className={styles.sparkles}>
      {SPARKLES.map((sparkle, index) => (
        <span
          key={index}
          style={
            {
              "--sparkle-left": `${sparkle.left}%`,
              "--sparkle-delay": `${sparkle.delay}s`,
              "--sparkle-duration": `${sparkle.duration}s`,
              "--sparkle-size": `${sparkle.size}px`,
              "--sparkle-drift": `${sparkle.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className={styles.headingRow}>
      <Image alt="" height={164} src={ASSETS.headingLeft} width={316} />
      <h2>{children}</h2>
      <Image alt="" height={164} src={ASSETS.headingRight} width={312} />
    </div>
  );
}

function HeroSection() {
  return (
    <section className={`${styles.canvas} ${styles.hero}`}>
      <div className={styles.heroFilm}>
        <video autoPlay loop muted playsInline>
          <source src={BACKGROUND_VIDEO} type="video/mp4" />
        </video>
        <div className={styles.heroVeil} />
      </div>

      <div className={styles.heroIntro}>
        <Reveal delay={300}>
          <p className={styles.scriptTitle}>{invitation.intro.eyebrow}</p>
          <time className={styles.heroDate}>{invitation.displayDate}</time>
        </Reveal>
        <Reveal delay={650}>
          <h1>
            <span>{invitation.brideName}</span>
            <i>و</i>
            <span>{invitation.groomName}</span>
          </h1>
        </Reveal>
      </div>

      <Image
        alt=""
        className={styles.heroLeft}
        height={1260}
        src={ASSETS.heroLeft}
        width={823}
      />
      <Image
        alt=""
        className={styles.heroRight}
        height={1260}
        src={ASSETS.heroRight}
        width={829}
      />
      <Image
        alt=""
        className={styles.heroBackdrop}
        height={833}
        src={ASSETS.heroBackdrop}
        width={1680}
      />
      <Image
        alt=""
        className={styles.scrollFlourish}
        height={312}
        src={ASSETS.scrollFlourish}
        width={1022}
      />

      <Reveal className={styles.heroMessage}>
        {invitation.intro.storyTitle.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <div>
          <strong>{invitation.intro.greeting}</strong>
          <span>{invitation.intro.message}</span>
        </div>
      </Reveal>
    </section>
  );
}

function CountdownSection() {
  const countdown = useCountdown();
  const units = [
    ["روز", countdown.days],
    ["ساعت", countdown.hours],
    ["دقیقه", countdown.minutes],
    ["ثانیه", countdown.seconds],
  ] as const;

  return (
    <section className={`${styles.canvas} ${styles.countdownSection}`}>
      <h2>تا آغاز جشن</h2>
      <Reveal className={styles.countdown}>
        {units.map(([label, value], index) => (
          <div className={styles.countdownFragment} key={label}>
            {index > 0 && <span className={styles.separator}>:</span>}
            <div className={styles.timeBlock}>
              <strong>
                <span key={value}>
                  {formatPersianNumber(value, index === 0 ? 1 : 2)}
                </span>
              </strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section className={`${styles.canvas} ${styles.scheduleSection}`}>
      <Image
        alt=""
        className={styles.scheduleTop}
        height={652}
        src={ASSETS.scheduleTop}
        width={1680}
      />
      <Image
        alt=""
        className={styles.scheduleBottom}
        height={563}
        src={ASSETS.scheduleBottom}
        width={1680}
      />
      <SectionHeading>برنامه مراسم</SectionHeading>
      <Reveal className={styles.scheduleFeature}>
        <span className={styles.featureMark}>
          <Image alt="" height={1201} src={ASSETS.scheduleRose} width={1309} />
        </span>
        <time className={styles.featureTime}>{invitation.schedule.time}</time>
        <span className={styles.featureRule}>
          <i />
        </span>
        <p className={styles.featureTitle}>{invitation.schedule.title}</p>
        <p className={styles.featureNote}>{invitation.schedule.note}</p>
      </Reveal>
    </section>
  );
}

function LocationSection() {
  return (
    <section className={`${styles.canvas} ${styles.locationSection}`}>
      <SectionHeading>نشانی مراسم</SectionHeading>
      <Image
        alt=""
        className={styles.locationDecor}
        height={120}
        src={ASSETS.locationDecor}
        width={384}
      />
      <Reveal className={styles.locationCopy}>
        <h3>{invitation.venue.name}</h3>
        <p>{invitation.venue.address}</p>
        <div className={styles.mapApps}>
          {MAP_LINKS.map((app) => (
            <a
              aria-label={`نمایش محل مراسم در ${app.title}`}
              className={styles.mapApp}
              href={app.href}
              key={app.key}
              rel="noreferrer"
              target="_blank"
            >
              <span className={styles.mapAppLogo}>
                <Image alt="" height={64} src={app.logo} width={64} />
              </span>
              <small>{app.title}</small>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function InvitationExperience() {
  const [sequence, setSequence] = useState<SequenceState>("sealed");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const invitationScale = useInvitationScale();
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const isAudioMutedByUserRef = useRef(false);

  useEffect(() => {
    if (sequence === "done") return;

    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    window.scrollTo(0, 0);

    return () => {
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      root.style.overscrollBehavior = "";
    };
  }, [sequence]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sequence !== "done") return;

    const root = document.scrollingElement ?? document.documentElement;
    let isDismissed = false;

    const update = () => {
      const isScrollable = root.scrollHeight > root.clientHeight + 60;
      setIsHintVisible(!isDismissed && isScrollable && root.scrollTop < 24);
    };

    const dismiss = () => {
      isDismissed = true;
      setIsHintVisible(false);
    };

    const frame = window.requestAnimationFrame(update);
    const hideTimer = window.setTimeout(dismiss, 8_000);
    document.addEventListener("scroll", update, { capture: true, passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      document.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, [sequence]);

  const finishSequence = useCallback(() => {
    setSequence((current) => {
      if (current !== "playing") return current;
      fadeTimerRef.current = window.setTimeout(() => setSequence("done"), 1_400);
      return "fading";
    });
  }, []);

  const startSequence = useCallback(() => {
    setSequence((current) => (current === "sealed" ? "playing" : current));
    setIsAudioPlaying(true);

    const videoPlayback = introVideoRef.current?.play();
    if (videoPlayback) void videoPlayback.catch(() => finishSequence());

    if (audioRef.current) {
      audioRef.current.volume = 1;
      const audioPlayback = audioRef.current.play();
      if (audioPlayback) {
        void audioPlayback.catch(() => setIsAudioPlaying(false));
      }
    }
  }, [finishSequence]);

  useEffect(() => {
    if (sequence !== "sealed") return;

    const autoStartTimer = window.setTimeout(startSequence, 5_000);
    return () => window.clearTimeout(autoStartTimer);
  }, [sequence, startSequence]);

  useEffect(() => {
    if (sequence === "sealed") return;

    const audio = audioRef.current;
    if (!audio) return;

    const gestureEvents = ["pointerdown", "touchend", "keydown"] as const;

    const stopListening = () => {
      gestureEvents.forEach((eventName) =>
        document.removeEventListener(eventName, handleGesture),
      );
    };

    const tryPlay = () => {
      if (isAudioMutedByUserRef.current || !audio.paused) return;

      void audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          stopListening();
        })
        .catch(() => undefined);
    };

    function handleGesture(event: Event) {
      const target = event.target as Element | null;
      if (target?.closest("[data-audio-toggle]")) return;
      tryPlay();
    }

    tryPlay();
    gestureEvents.forEach((eventName) =>
      document.addEventListener(eventName, handleGesture, { passive: true }),
    );

    return stopListening;
  }, [sequence]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      isAudioMutedByUserRef.current = false;
      void audio.play().then(() => setIsAudioPlaying(true)).catch(() => undefined);
    } else {
      isAudioMutedByUserRef.current = true;
      audio.pause();
      setIsAudioPlaying(false);
    }
  };

  return (
    <div className={styles.page}>
      <audio loop preload="auto" ref={audioRef} src={BACKGROUND_AUDIO} />

      <main>
        <div
          className={styles.invitationContent}
          style={
            {
              "--invitation-scale": invitationScale,
              ...(invitationScale < 1
                ? { height: `${ARTBOARD_HEIGHT * invitationScale}px` }
                : {}),
            } as CSSProperties
          }
        >
          <HeroSection />
          <CountdownSection />
          <ScheduleSection />
          <LocationSection />
        </div>
      </main>

      {sequence !== "sealed" && <Sparkles />}

      {sequence === "done" && (
        <div
          aria-hidden="true"
          className={`${styles.scrollHint} ${isHintVisible ? "" : styles.scrollHintHidden}`}
        >
          <span>برای دیدن ادامه اسکرول کنید</span>
          <i />
        </div>
      )}

      {sequence !== "done" && (
        <div
          className={`${styles.sequenceLayer} ${sequence === "fading" ? styles.sequenceFading : ""}`}
        >
          <button
            aria-label="باز کردن دعوت‌نامه"
            className={`${styles.envelopeGate} ${sequence !== "sealed" ? styles.gateHidden : ""}`}
            onClick={startSequence}
            type="button"
          >
            <Image
              alt="باز کردن دعوت‌نامه"
              height={1672}
              priority
              sizes="(max-width: 440px) 100vw, 440px"
              src={ENVELOPE_IMAGE}
              width={941}
            />
            <span aria-hidden="true" className={styles.envelopeGlow} />
            <span className={styles.tapPrompt}>
              <i />
              <b>برای باز کردن دعوت‌نامه لمس کنید</b>
            </span>
          </button>

          <div
            className={`${styles.introVideoLayer} ${sequence !== "sealed" ? styles.videoVisible : ""}`}
          >
            <video
              muted
              onEnded={finishSequence}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (video.duration && video.currentTime >= video.duration - 0.8) {
                  finishSequence();
                }
              }}
              playsInline
              preload="auto"
              ref={introVideoRef}
              src={INTRO_VIDEO}
            />
          </div>
        </div>
      )}

      {(sequence === "fading" || sequence === "done") && (
        <button
          aria-label={isAudioPlaying ? "توقف موسیقی پس‌زمینه" : "پخش موسیقی پس‌زمینه"}
          className={`${styles.audioButton} ${isAudioPlaying ? styles.audioPlaying : ""}`}
          data-audio-toggle
          onClick={toggleAudio}
          type="button"
        >
          {isAudioPlaying ? (
            <span className={styles.pauseIcon}>
              <i />
              <i />
            </span>
          ) : (
            <span className={styles.playIcon} />
          )}
        </button>
      )}
    </div>
  );
}
