import type { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { infoPages } from "../components/InfoPage/content";

export const metadata: Metadata = {
  title: "Refund Policy | xtreme",
};

export default function RefundPolicyPage() {
  return <InfoPage content={infoPages["refund-policy"]} />;
}
