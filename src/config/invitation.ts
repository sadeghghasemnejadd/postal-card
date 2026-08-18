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
    label: "باغ",
    address: "شیراز، ویلاشهر پردیس (دریمه)، فرعی ۱۵، باغ فضل‌اله قاسم‌نژاد",
    maps: {
      google: "https://maps.app.goo.gl/FYSa7uQoukBt4GqD7",
      balad: "https://balad.ir/directions/driving?destination=52.761721,29.597006",
      neshan: "https://neshan.org/maps/routing/car/destination/29.597006,52.761721",
    },
  },
  office: {
    label: "محضر",
    address: "شیراز، معالی‌آباد، بلوار بهشت، نبش کوچه ۷، محضر شماره ۲۲۵",
    maps: {
      google: "https://maps.app.goo.gl/NEVBFVCM3VB4KCFv9",
      balad: "https://balad.ir/directions/driving?destination=52.474722,29.689266",
      neshan: "https://neshan.org/maps/routing/car/destination/29.689266,52.474722",
    },
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
