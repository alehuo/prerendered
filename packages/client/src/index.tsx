import React, { useContext } from "react";
import { getPrerenderedData } from "@prerendered/shared";

const data = getPrerenderedData();
const SSRContext_ = React.createContext(data);

export const SSRContext: React.FC = ({ children }) => (
  <SSRContext_.Provider value={data}>{children}</SSRContext_.Provider>
);

export function useSSR<T extends object>(): T {
  return useContext(SSRContext_) as T;
}
