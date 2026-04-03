"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setPermissions } from "../store/permissionsSlice";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const permissions = useSelector((state: RootState) => state.permissions.data);

  useEffect(() => {
    if (permissions !== null) return; // уже загружено

    async function fetchPermissions() {
      const res = await fetch("/api/permissions");
      const data = await res.json();
      dispatch(setPermissions(data));
    }

    fetchPermissions();
  }, [dispatch, permissions]);

  if (permissions === null) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
};

export default HomeLayout;
