import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function UserProfile() {
  return (
    <Card className="bg-secondary h-fit w-80">
      <CardContent>
        <Image
          src="/images/dummy.png"
          alt="userPfp"
          width={50}
          height={50}
          className="rounded-full"
        ></Image>

        <div>
            <h3 className="font-semibold text-xl">
                Glitch Sanchez
            </h3>
            <p className="text-zinc-400">
                glitchsanchez66@gmail.com
            </p>
            
        </div>
      </CardContent>
    </Card>
  );
}
