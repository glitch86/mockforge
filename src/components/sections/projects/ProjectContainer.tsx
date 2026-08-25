"use client";
import { Project } from "@/app/types/Projects";
import ProjectCard from "@/components/shared/Cards/ProjectCard";
import Loader from "@/components/shared/Loader";
import useAxios from "@/hooks/axios/useAxios";
import React, { useEffect, useState } from "react";

const ProjectContainer = () => {
  const axios = useAxios();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/get-projects");

        setProjects(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axios]);

  //   console.log(projects);
  return (
    <div className="bg-secondary/50 grid grid-cols-3 gap-4 flex-2 p-9 rounded-4xl h-fit">
      {loading ? (
        <Loader></Loader>
      ) : (
        projects.map(project => 

            <ProjectCard key={project._id} project={project}></ProjectCard>
        )
      )}
    </div>
  );
};

export default ProjectContainer;
