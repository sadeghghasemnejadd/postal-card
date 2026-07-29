import type { Metadata } from "next";

import HomeContainer from "@/components/pages/home/HomeContainer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "محمد صادق و فاطمه | کارت دعوت عقد",
    description:
      "کارت دعوت مراسم عقد محمد صادق و فاطمه در ۵ شهریور ۱۴۰۵.",
  };
}

export default async function HomePage() {
  return <HomeContainer />;
}
