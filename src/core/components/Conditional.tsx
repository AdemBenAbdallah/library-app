import React, { PropsWithChildren, ReactElement } from "react";

type ConditionalProps = PropsWithChildren & {
  condition: boolean;
  wrap: (children: React.ReactNode) => ReactElement;
};
const Conditional = ({ condition, wrap, children }: ConditionalProps) => {
  return <>{condition ? wrap(children) : children}</>;
};

export default Conditional;
