"use client";

import { ReactNode, useEffect } from "react";
import { setPermissions } from "../store/permissionsSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchPermissions() {
      const res = await fetch("/api/permissions");
      const data = await res.json();
      dispatch(setPermissions(data));
    }

    fetchPermissions();
  }, [dispatch]);

  return <>{children}</>;
};

export default HomeLayout;
