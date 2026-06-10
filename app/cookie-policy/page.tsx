import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "Cookie Policy | xtreme",
};

export default function CookiePolicyPage() {
  return <InfoPage content={infoPages["cookie-policy"]} />;
}
