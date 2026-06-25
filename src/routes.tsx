import type { ReactNode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

type RouteItem = {
  path: string;
  name: string;
  element: ReactNode;
};

export const routers: RouteItem[] = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

/* global window type */
declare global {
  interface Window {
    __routers__: RouteItem[];
  }
}

window.__routers__ = routers;