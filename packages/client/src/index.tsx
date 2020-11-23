import React, { useContext } from "react";
import { getPrerenderedData } from "@prerendered/shared";

export const SSRContext = React.createContext(getPrerenderedData());

export function useSSR<T extends object>(): T {
  return useContext(SSRContext) as T;
}
