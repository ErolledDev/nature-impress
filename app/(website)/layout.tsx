import { getSettings } from "@/lib/staticData/fetcher";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export async function generateMetadata() {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.url),
    alternates: {
      canonical: settings.url
    }
  };
}

export default async function Layout({ children }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar {...settings} />
      <div>{children}</div>
      <Footer {...settings} />
    </>
  );
}