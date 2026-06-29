import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  my: number;
  p: number;
};
const Section = ({ children, my, p }: Props) => {
  return (
    <section className={`container mx-auto my-${my ? my : 12} p-${p ? p : 12}`}>
      {children}
    </section>
  );
};

export default Section;
