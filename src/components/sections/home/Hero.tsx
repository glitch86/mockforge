"use client";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/axios/useAxios";
import ShapeGrid from "@/components/ShapeGrid";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-screen w-full relative ">
      <ShapeGrid
        speed={0.9}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#2F293A"
        hoverFillColor="#222"
        shape="hexagon" // square, hexagon, circle, triangle
        hoverTrailAmount={0} // number of trailing hovered shapes (0 = no trail)
        // size={40}
      />
    <div className="absolute top-0 w-full h-full">
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
            <p className="">
              Instant API generation for developers. No backend, no friction.
              Build features while the
              <br />
              backend team is still in the planning phase.
            </p>
            <div className="my-6">
              <Link href={"/dashboard"} className="">
                <Button className="px-6 py-6 bg-accent text-white">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
