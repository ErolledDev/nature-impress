import { getSettings } from "@/lib/staticData/fetcher";
import Contact from "./contact";

export default async function ContactPage() {
  const settings = await getSettings();
  return <Contact settings={settings} />;
}

// export const revalidate = 60;
