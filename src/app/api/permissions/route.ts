// app/api/permissions/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const permissions = [
    { resource: "documents", scopes: ["write"] },
    { resource: "contacts", scopes: ["read", "write"] },
  ];

  return NextResponse.json(permissions);
}
