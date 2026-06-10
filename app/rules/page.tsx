import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "Rules | xtreme",
};

export default function RulesPage() {
  return <InfoPage content={infoPages.rules} />;
}
