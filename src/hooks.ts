import { PermissionsArray } from "./types";

export function usePermissions(permissions: PermissionsArray = []) {
  function hasPermission(resource: string, scope: string) {
    if (!permissions || permissions.length === 0) return false;
    return permissions.some(
      (perm) => perm.resource === resource && perm.scopes.includes(scope),
    );
  }

  return { permissions, hasPermission };
}
