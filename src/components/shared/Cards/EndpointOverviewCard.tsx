import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitBranchIcon } from "lucide-react";

const EndpointOverviewCard = () => {
    return (
        <Card className="bg-secondary h-fit w-80">
      <CardHeader className="flex items-start justify-between">
        <div className={`bg-secondary-foreground rounded-lg p-2 text-orange-500 `}>
          <GitBranchIcon size={40}></GitBranchIcon>
        </div>
        <div className={`flex items-center gap-1 text-green-400`}>
          <div className='size-3 rounded-full bg-green-400'></div>
          <span>Active</span>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-5xl font-semibold">
            12
        </h2>
        <p className="font uppercase py-4">
            total projects
        </p>
      </CardContent>
    </Card>
    );
};

export default EndpointOverviewCard;