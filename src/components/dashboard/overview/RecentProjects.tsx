"use client";
import { Project } from "@/app/types/Projects";
import ProjectCard from "@/components/shared/Cards/ProjectCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RecentProjects() {
  const [projectIDs, setProjectIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // const storedIds = localStorage.getItem("projectID");
    // if (storedIds) {
    //   setProjectIDs(JSON.parse(storedIds));
    // }

    const getProjects = async () => {
      setLoading(true);
      const storedIds = localStorage.getItem("projectID");
      if (!storedIds) return;
      const ids: string[] = JSON.parse(storedIds);
      // console.log(ids);
      setProjectIDs(ids);
      const res = await axios.get("/api/get-projects/recent", {
        params: {
          ids,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      setProjects(res.data);
      setLoading(false);
    };

    getProjects();
  }, []);

  // console.log(projects)
  return (
    <div className="my-4">
      <div>
        <h3 className="font-semibold text-xl my-2">Recent Projects</h3>
      </div>

      <div className="my-4 bg-secondary/50 min-w-0 w-full p-9 rounded-4xl h-fit overflow-x-auto ">
        <div className="flex gap-4 w-max">
          {projects.map((project) => {
            return (
              <div key={project.projectID} className="shrink-0">
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
