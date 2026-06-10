import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "About | xtreme",
};

export default function AboutPage() {
  return <InfoPage content={infoPages.about} decorated />;
}
