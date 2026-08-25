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
  const {
    _id,
    title,
    description,
    projectID,
    endpoints,
    response,
    lastUpdated,
  } = project;


  // store id in localStorage
  const storeId = (projectID: string) => {
    const storedIds: string[] = JSON.parse(
      localStorage.getItem("projectID") ?? "[]",
    );

    // remove duplicate ids
    const filtered = storedIds.filter((id) => id !== projectID);

    filtered.unshift(projectID);
    localStorage.setItem("projectID", JSON.stringify(filtered));
  };

  return (
    <Card className="bg-secondary h-56 w-72">
      <CardHeader>
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-zinc-500 line-clamp-2 h-5">{description} </p>
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
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <History></History>
          <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
        </div>
        <Link href={`projects/${projectID}`}>
          <Button
            className="bg-secondary-foreground text-accent"
            onClick={() => storeId(projectID)}
          >
            <span>Open</span>
            <ArrowBigRightDash></ArrowBigRightDash>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
