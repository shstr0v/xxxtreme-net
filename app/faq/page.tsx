import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "FAQ | xtreme",
};

export default function FaqPage() {
  return <InfoPage content={infoPages.faq} />;
}
