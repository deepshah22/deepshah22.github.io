import Hero from "./Hero";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Experience />
      <Education />
      <Certifications />
    </div>
  );
}
