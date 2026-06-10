import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "Privacy Policy | xtreme",
};

export default function PrivacyPolicyPage() {
  return <InfoPage content={infoPages["privacy-policy"]} />;
}
