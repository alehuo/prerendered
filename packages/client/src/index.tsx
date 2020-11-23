import React, { useContext } from "react";
import { getPrerenderedData } from "@prerendered/shared";

const data =
  typeof window !== "undefined" && window.__PRERENDERED__ !== undefined
    ? getPrerenderedData()
    : {};
const SSRContext_ = React.createContext(data);

type Props = {
  value?: any;
};

export const SSRContext: React.FC<Props> = ({
  children,
  value = getPrerenderedData(),
}) => <SSRContext_.Provider value={value}>{children}</SSRContext_.Provider>;

export function useSSR<T extends object>(): T {
  return useContext(SSRContext_) as T;
}
