export const invitation = {
  brideName: "فاطمه",
  groomName: "محمد صادق",
  coupleTitle: "فاطمه و محمد صادق",
  displayDate: "۵ شهریور ۱۴۰۵",
  eventDate: "2026-08-27T16:00:00+03:30",
  intro: {
    eyebrow: "روز پیوند ما",
    storyTitle: ["دو روح", "یک سرنوشت", "یک عمر به خواست خدا"],
    greeting: "خانواده و دوستان عزیز",
    message:
      "در شبی سرشار از عشق، لبخند، دعا و خاطره‌های ماندگار، در آغاز زندگی مشترکمان کنار ما باشید.",
  },
  venue: {
    name: "باغ فضل‌اله قاسم‌نژاد",
    address: "شیراز، ویلاشهر پردیس (دریمه)، فرعی ۱۵",
    maps: {
      google:
        "https://www.google.com/maps/dir/?api=1&destination=29.597006,52.761721&travelmode=driving",
      balad:
        "https://balad.ir/location?latitude=29.597006&longitude=52.761721&zoom=16.5",
      neshan: "https://neshan.org/maps/@29.597006,52.761721,17.0z",
    },
  },
  schedule: {
    time: "۸ شب",
    title: "آغاز مراسم در باغ",
    note: "تا پاسی از شب",
  },
} as const;

export type InvitationConfig = typeof invitation;
