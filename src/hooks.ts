// hooks/usePermissions.ts
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export function usePermissions() {
  const permissions = useSelector((state: RootState) => state.permissions.data);

  function hasPermission(resource: string, scope: string) {
    if (!permissions) return false;
    return permissions.some(
      (perm) => perm.resource === resource && perm.scopes.includes(scope),
    );
  }

  return { permissions, hasPermission };
}
