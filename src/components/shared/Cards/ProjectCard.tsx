import { Project } from "@/app/types/Projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowBigRightDash, Circle, History } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  project: Project;
};
const ProjectCard = ({ project }: Props) => {
  const { title, description, endpoints, response, lastUpdated } = project;

  return (
    <Card className="bg-secondary h-64 w-80">
      <CardHeader>
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-zinc-500 line-clamp-2">{description} </p>
      </CardHeader>
      <CardContent className="flex gap-4 items-center">
        {/* endpoints  */}
        <div className="flex-1">
          <p>Endpoints</p>
          <div className="flex items-center justify-center gap-1 bg-secondary-foreground px-4 py-2 rounded-xl w-full">
            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
            <span>{endpoints} Active</span>
          </div>
        </div>

        {/* respone  */}
        <div className="flex-1">
          <p>Response</p>
          <div className="flex items-center justify-center gap-1 bg-secondary-foreground px-4 py-2 rounded-xl w-full">
            <span className="">~{response} ms</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1">
          <History></History>
          <span>Updated {lastUpdated}</span>
        </div>
        <Link href={""}>
          <Button className="bg-secondary-foreground text-accent">
            <span>Open</span>
            <ArrowBigRightDash></ArrowBigRightDash>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
