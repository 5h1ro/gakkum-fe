import { JSX } from "react/jsx-runtime";

export interface props {
  children?: JSX.Element | JSX.Element[];
  window?: () => Window;
}