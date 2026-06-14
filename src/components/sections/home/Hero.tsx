import DotGrid from "@/components/DotGrid";
import Section from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full relative ">
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#2F293A"
        activeColor="#FFFFFF"
        proximity={100}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <div className="absolute top-0 w-full h-full ">
        <div className=" flex flex-col justify-center w-full h-full container mx-auto">
          <div className="flex flex-col justify-center items-center gap-5 text-center -my-4">
            <h1 className="text-6xl font-semibold">
              Mock APIs for Modern{" "}
              <span className="text-accent">
                Frontend
                <br />
                Development
              </span>
            </h1>
            <p>
              Instant API generation for developers. No backend, no friction.
              Build features while the
              <br />
              backend team is still in the planning phase.
            </p>
          </div>
          <div className="flex justify-center items-center gap-5 my-6">
            <Button className="px-6 py-6 bg-accent text-white">
              Get started
            </Button>
            <Button className="px-6 py-6 bg-transparent border-accent border-2 text-accent">
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
