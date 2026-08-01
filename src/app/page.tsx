import type { Metadata } from "next";

import HomeContainer from "@/components/pages/home/HomeContainer";
import { invitation } from "@/config/invitation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${invitation.brideName} و ${invitation.groomName} | دعوت‌نامه عقد`,
    description:
      "در شبی سرشار از عشق، لبخند، دعا و خاطره‌های ماندگار، در آغاز زندگی مشترکمان کنار ما باشید.",
  };
}

export default async function HomePage() {
  return <HomeContainer />;
}
