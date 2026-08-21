import UserProfile from "@/components/dashboard/overview/UserProfile";
import UserStats from "@/components/dashboard/overview/UserStats";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="my-4">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-primary">Manage your projects and endpoints.</p>
      </div>
      <div className="flex gap-4">
        <UserStats></UserStats>
        <Separator orientation="vertical"></Separator>
        <UserProfile></UserProfile>
      </div>
    </div>
  );
};

export default Dashboard;
