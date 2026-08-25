"use client";
import { Project } from "@/app/types/Projects";
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
    <div className="my-4 max-w-full bg-secondary/50 flex gap-4 p-9 rounded-4xl h-fit overflow-x-auto ">
      {/* {projects.map((project: Project) => console.log(project))} */}
    </div>
  );
}
