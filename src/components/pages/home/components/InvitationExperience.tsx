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
const ARTBOARD_HEIGHT = 2_371;

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

const PLACES = [invitation.venue, invitation.office] as const;

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
              <strong>{formatPersianNumber(value, index === 0 ? 1 : 2)}</strong>
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
      <div className={styles.schedule}>
        {invitation.schedule.map((item, index) => (
          <Reveal className={styles.scheduleRow} delay={index * 90} key={item.time}>
            <time>{item.time}</time>
            <span className={styles.timelineMark}>
              <Image alt="" height={1201} src={ASSETS.scheduleRose} width={1309} />
            </span>
            <p>{item.title}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PlaceCard({ place }: { place: (typeof PLACES)[number] }) {
  return (
    <div className={styles.placeCard}>
      <h3>{place.label}</h3>
      <p>{place.address}</p>
      <div className={styles.mapApps}>
        {MAP_APPS.map((app) => (
          <a
            aria-label={`مسیریابی ${place.label} با ${app.title}`}
            className={styles.mapApp}
            href={place.maps[app.key]}
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
    </div>
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
        {PLACES.map((place) => (
          <PlaceCard key={place.label} place={place} />
        ))}
      </Reveal>
    </section>
  );
}

export function InvitationExperience() {
  const [sequence, setSequence] = useState<SequenceState>("sealed");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const invitationScale = useInvitationScale();
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (sequence === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sequence]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sequence !== "done") return;

    const handleScroll = () => {
      if (window.scrollY > 40) setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sequence]);

  const finishSequence = useCallback(() => {
    setSequence((current) => {
      if (current !== "playing") return current;
      fadeTimerRef.current = window.setTimeout(() => setSequence("done"), 1_400);
      return "fading";
    });
  }, []);

  const startSequence = () => {
    if (sequence !== "sealed") return;
    setSequence("playing");
    setIsAudioPlaying(true);

    const videoPlayback = introVideoRef.current?.play();
    if (videoPlayback) void videoPlayback.catch(() => undefined);

    if (audioRef.current) {
      audioRef.current.volume = 1;
      const audioPlayback = audioRef.current.play();
      if (audioPlayback) {
        void audioPlayback.catch(() => setIsAudioPlaying(false));
      }
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => setIsAudioPlaying(true)).catch(() => undefined);
    } else {
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

      {sequence === "done" && (
        <div
          aria-hidden="true"
          className={`${styles.scrollHint} ${hasScrolled ? styles.scrollHintHidden : ""}`}
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
            <span className={styles.tapPrompt}>
              <i />
              برای باز کردن لمس کنید
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
          className={styles.audioButton}
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
