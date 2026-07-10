"use client";
import { Project } from "@/app/types/Projects";
import AddEndpoints from "@/components/shared/Forms/AddEndpoints";
import Loader from "@/components/shared/Loader";
import Section from "@/components/shared/Section";
import EndpointTable from "@/components/Tables/EndpointTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAxios from "@/hooks/axios/useAxios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const axios = useAxios();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      const res = await axios.get(`/get-projects/${id}`);

      setProject(res.data);
      setLoading(false);
    };
    fetchData();
  }, [axios, params]);

  if (loading || !project) {
    return <Loader></Loader>;
  }

  const { title, description, endpoints, response, createdAt } = project;
  // console.log(project);
  return (
    <Section my={1} p={9}>
      {/* header  */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-3xl ">{title}</h2>
          <p className="text-zinc-500">{description}</p>
        </div>


        <div className="">
          <Dialog>
            <Button asChild>
              <DialogTrigger>Create Endpoints</DialogTrigger>
            </Button>
            <DialogContent className="sm:max-w-fit">
              <DialogTitle>Create Endpoints</DialogTitle>
              {/* <DialogHeader>Add project</DialogHeader> */}

              <AddEndpoints projectTitle={title}></AddEndpoints>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* table */}
      <EndpointTable></EndpointTable>
    </Section>
  );
}
