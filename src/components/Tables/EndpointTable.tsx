"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Endpoint } from "@/app/types/Endpoints";
import useAxios from "@/hooks/axios/useAxios";
import { Copy, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import toast from "react-hot-toast";

type Props = {
  projectTitle: string;
};
const EndpointTable = ({ projectTitle }: Props) => {
  const projectID = projectTitle
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-");

  const axios = useAxios();

  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/get-endpoints/${projectID}`);

      setEndpoints(res.data);
      setLoading(false);
    };
    fetchData();
  }, [axios, projectID]);

  if (loading || !endpoints) {
    return <Loader></Loader>;
  }

// copy url 

async function copyPath(text: string): Promise<boolean> {
  try {
    const url = `http://localhost:3000/api/mock${text}`
    // const url = `https://mockforge-omega.vercel.app/api/mock${text}`

    await navigator.clipboard.writeText(url);
    toast.success("Copied.")
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
}

  // const datas = [
  //   {
  //     method: "GET",
  //     path: "/users",
  //     created: "22-02-2022",
  //   },
  // ];
  return (
    <Table>
      <TableCaption>Endpoints({endpoints.length}) </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Method</TableHead>
          <TableHead>Path</TableHead>
          <TableHead>Created On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {endpoints.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.method}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <span className="bg-secondary-foreground px-4 py-2 rounded-xl text-orange-400">
                {data.path}
              </span>

              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-secondary-foreground text-zinc-400 toolt" onClick={() => copyPath(data.path)}>
                      <Copy></Copy>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
            <TableCell>
              {new Date(data.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EndpointTable;
