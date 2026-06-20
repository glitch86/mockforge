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
import { XIcon } from "lucide-react";
import React from "react";

const Projects = () => {
  return (
    <div>
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
  );
};

export default Projects;
