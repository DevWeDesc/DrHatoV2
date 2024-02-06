import { Navigate, useNavigate, redirect } from "react-router-dom";

import { ReactNode } from "react";

type IMiddleware = {
  children: ReactNode;
};

export const Middleware = ({ children }: IMiddleware) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const url = window.location.href;

  if (!user && url != "http://localhost:5173/") {
    return <>{() => redirect("/")}</>;
  }

  return <> {children}</>;
};
