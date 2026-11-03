import { ComplaintCta } from "@/components/home/ComplaintCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestNotices } from "@/components/home/LatestNotices";
import { ProjectsStrip } from "@/components/home/ProjectsStrip";
import { QuickServices } from "@/components/home/QuickServices";
import { WhyPortal } from "@/components/home/WhyPortal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickServices />
      <LatestNotices />
      <WhyPortal />
      <HowItWorks />
      <ComplaintCta />
      <ProjectsStrip />
    </>
  );
}
