import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Section = ({ children }: Props) => {
  return <section className="container mx-auto my-12 p-12">{children}</section>;
};

export default Section;
