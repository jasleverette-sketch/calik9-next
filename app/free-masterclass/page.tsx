import type { Metadata } from "next";
import Masterclass from "./Masterclass";

export const metadata: Metadata = {
  title: "Learn How To Train Your Dog With Jas Leverette",
  description:
    "Teach your dog to listen, at home and on walks. Join Jas Leverette's free live Cali K9® masterclass to build focus, communicate clearly, and plan your next training step. Includes the 50-Step Roadmap.",
  // Funnel page. Keep out of search while in review.
  robots: { index: false, follow: false },
};

export default function FreeMasterclassPage() {
  return <Masterclass focused />;
}
