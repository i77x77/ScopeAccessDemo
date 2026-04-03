interface Permission {
  resource: string;
  scopes: string[];
}

export function hasPermission(
  permissions: Permission[] | null,
  resource: string,
  scope: string,
): boolean {
  if (!permissions) return false;

  return permissions.some(
    (perm) => perm.resource === resource && perm.scopes.includes(scope),
  );
}
