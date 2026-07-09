import ProjectContainer from "@/components/sections/projects/ProjectContainer";
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
import useAxios from "@/hooks/axios/useAxios";
import { currentUser } from "@clerk/nextjs/server";

const Projects = () => {


  return (
    <div className="h-full flex flex-col px-7">
      {/* header  */}
      <div className="flex-1 ">
        <Dialog>
          <Button asChild>
            <DialogTrigger>Create Project</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogHeader>Add project</DialogHeader>

            <AddProjectForm></AddProjectForm>
          </DialogContent>
        </Dialog>
      </div>

      {/* project container */}
      <ProjectContainer></ProjectContainer>
    </div>
  );
};

export default Projects;
