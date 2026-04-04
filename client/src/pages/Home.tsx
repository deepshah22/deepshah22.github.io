import Hero from "./Hero";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import AILearningRoadmap from "./AiLearningRoadmapPage";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Experience />
      <Education />
      <Certifications />
      <AILearningRoadmap />
    </div>
  );
}
