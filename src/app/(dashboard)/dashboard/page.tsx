import GraphData from "@/components/dashboard/overview/GraphData";
import UserProfile from "@/components/dashboard/overview/UserProfile";
import UserStats from "@/components/dashboard/overview/UserStats";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Dashboard = () => {

  return (
    <div>
      <Breadcrumb></Breadcrumb>
      <div className="my-4">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-primary">Manage your projects and endpoints.</p>
      </div>
      <div className="flex gap-4 my-4">
        <UserStats></UserStats>
        <Separator orientation="vertical"></Separator>
        <UserProfile></UserProfile>
      </div>
      <Separator></Separator>

      <div className="my-4">
        <GraphData></GraphData>
      </div>
    </div>
  );
};

export default Dashboard;
