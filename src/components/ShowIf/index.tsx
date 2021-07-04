import { ShowIfProps } from "./type";
import React from "react";

export const ShowIf: React.FC<ShowIfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};
