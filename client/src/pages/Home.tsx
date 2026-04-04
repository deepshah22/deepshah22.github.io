import Hero from "./Hero";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import AILearningRoadmapPage from "./AILearningRoadmapPage";
import AICrashCourse from "./AICrashCourse";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Experience />
      <Education />
      <Certifications />
      <AICrashCourse />
      <AILearningRoadmapPage />
    </div>
  );
}
