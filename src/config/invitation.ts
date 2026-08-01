export const invitation = {
  brideName: "فاطمه",
  groomName: "صادق",
  coupleTitle: "فاطمه و صادق",
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
    name: "مرکز اسلامی ملویل",
    address: "۱۱۸ اولد ایست نک رود، ملویل، نیویورک ۱۱۷۴۷",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Islamic+Center+of+Melville",
  },
  schedule: [
    { title: "ورود مهمانان", time: "۵ عصر" },
    { title: "مراسم عقد", time: "۶ عصر" },
    { title: "پذیرایی و نوشیدنی", time: "۷ شب" },
    { title: "صرف شام", time: "۸ شب" },
    { title: "جشن و پایکوبی", time: "۹ شب" },
  ],
} as const;

export type InvitationConfig = typeof invitation;
