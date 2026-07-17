import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FolderGit2Icon, TrendingUp } from "lucide-react";
import React from "react";

const ProjectOverviewCard = () => {
  return (
    <Card className="bg-secondary h-fit w-80">
      <CardHeader className="flex items-start justify-between">
        <div className={`bg-secondary-foreground rounded-lg p-2 text-accent`}>
          <FolderGit2Icon size={40}></FolderGit2Icon>
        </div>
        <div className={`flex items-center gap-1 text-green-400`}>
          <TrendingUp></TrendingUp>
          <span>+2 this week</span>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-5xl font-semibold">
            12
        </h2>
        <p className="font uppercase py-4">
            total projects
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewCard;
