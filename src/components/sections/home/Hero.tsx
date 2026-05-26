import Section from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <Section>
      <div className="flex flex-col justify-center items-center gap-5 text-center">
        <h1 className="text-6xl font-semibold">
          Mock APIs for Modern{" "}
          <span className="text-accent">Frontend Development</span>
        </h1>
        <p>
          Instant API generation for developers. No backend, no friction. Build
          features while the
          <br />
          backend team is still in the planning phase.
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 my-6">
        <Button className="px-6 py-6 bg-accent text-white">Get started</Button>
        <Button className="px-6 py-6 bg-transparent border border-accent border-2 text-accent">View Dashboard</Button>
      </div>
    </Section>
  );
};

export default Hero;
