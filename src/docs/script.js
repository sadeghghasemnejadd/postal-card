const EVENT_DATE = new Date("2026-08-27T00:00:00+03:30");
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

const countdownElement = document.querySelector("#countdown");
const countdownTitle = document.querySelector("#countdown-title");
const noticeElement = document.querySelector("#notice");
const fields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

let noticeTimer;

function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

function getCountdown() {
  const distance = Math.max(0, EVENT_DATE.getTime() - Date.now());

  return {
    distance,
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function updateCountdown() {
  const countdown = getCountdown();

  if (countdown.distance === 0) {
    countdownTitle.textContent = "قصه مشترک ما آغاز شد";
    countdownElement.hidden = true;
    return;
  }

  Object.entries(fields).forEach(([key, element]) => {
    element.textContent = toPersianDigits(countdown[key]);
  });
}

function showNotice(message) {
  window.clearTimeout(noticeTimer);
  noticeElement.textContent = message;
  noticeElement.classList.add("notice-visible");

  noticeTimer = window.setTimeout(() => {
    noticeElement.classList.remove("notice-visible");
  }, 2_600);
}

async function copyLink() {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(window.location.href);
    return;
  }

  const input = document.createElement("textarea");
  input.value = window.location.href;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

async function shareInvitation() {
  const shareData = {
    title: "کارت دعوت عقد محمد صادق و فاطمه",
    text: "با مهر، شما را به تماشای آغاز قصه‌مان دعوت می‌کنیم — ۱۴۰۵/۰۶/۰۵",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await copyLink();
    showNotice("لینک دعوت‌نامه کپی شد");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showNotice("امکان اشتراک‌گذاری وجود ندارد");
    }
  }
}

function saveTheDate() {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sadegh & Fatemeh//Engagement//FA",
    "BEGIN:VEVENT",
    "UID:sadegh-fatemeh-1405-06-05",
    "DTSTAMP:20260729T000000Z",
    "DTSTART;VALUE=DATE:20260827",
    "DTEND;VALUE=DATE:20260828",
    "SUMMARY:مراسم عقد محمد صادق و فاطمه",
    "DESCRIPTION:یادگاری از روزی که «ما» شدیم",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const file = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sadegh-fatemeh-1405-06-05.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showNotice("تاریخ در تقویم ذخیره شد");
}

document.querySelector("#share-button").addEventListener("click", shareInvitation);
document.querySelector("#calendar-button").addEventListener("click", saveTheDate);

updateCountdown();
window.setInterval(updateCountdown, 1_000);
