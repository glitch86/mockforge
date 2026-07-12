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
import { Loader } from "lucide-react";

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

  console.log(endpoints)
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
            <TableCell>{data.path}</TableCell>
            <TableCell>{new Date(data.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EndpointTable;
