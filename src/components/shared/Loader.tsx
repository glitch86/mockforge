import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Loader = () => {
  return (
    <div className="w-fit mx-auto">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  );
};

export default Loader;
