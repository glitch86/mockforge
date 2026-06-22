import ProjectCard from "@/components/shared/Cards/ProjectCard";
import AddProjectForm from "@/components/shared/Forms/AddProjectForm";
import { Button } from "@/components/ui/button";
// import { Dialog as DialogPrimitive } from "radix-ui";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { currentUser } from "@clerk/nextjs/server";
import { XIcon } from "lucide-react";
import React from "react";

const Projects = async () => {
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);
  return (
    <div className="h-full flex flex-col px-7">
      {/* header  */}
      <div className="flex-1 ">
        <Dialog>
          <Button asChild>
            <DialogTrigger>Create Project</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogTitle>hh</DialogTitle>
            <DialogHeader>Add project</DialogHeader>

            <AddProjectForm></AddProjectForm>
          </DialogContent>
        </Dialog>
      </div>

      {/* project container */}
      <div className="bg-secondary/50 flex-2 p-9 rounded-4xl h-fit">
        <ProjectCard></ProjectCard>
      </div>
    </div>
  );
};

export default Projects;
