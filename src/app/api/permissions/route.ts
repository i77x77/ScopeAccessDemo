// app/api/permissions/route.ts
import { NextRequest, NextResponse } from "next/server";

interface ResourcePermissions {
  resource: string;
  scopes: string[];
}

export async function POST(request: NextRequest) {
  const accessToken = process.env.TOKEN_USER; // Здесь будет логика, где будем брать токен из сессии на сервере

  const body = await request.json();
  const resources: string[] = body.resources;

  if (!Array.isArray(resources) || resources.length === 0) {
    return NextResponse.json([], { status: 400 });
  }

  const authServerUrl = process.env.AUTH_SERVER_URL;
  const realm = process.env.REALM_NAME;
  const clientId = process.env.CLIENT_ID;

  if (!authServerUrl || !realm || !clientId) {
    console.error("Missing Keycloak configuration");
    return NextResponse.json([], { status: 500 });
  }

  const tokenUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/token`;

  const params = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:uma-ticket",
    audience: clientId,
    response_mode: "permissions",
  });

  for (const res of resources) {
    params.append("permission", res);
  }

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
      body: params,
    });

    if (!response.ok) {
      console.error(`Keycloak error: ${await response.text()}`);
      return NextResponse.json([], { status: response.status });
    }

    const keycloakData: { resource?: string; scopes: string[] }[] =
      await response.json();

    let permissions: ResourcePermissions[] = [];

    if (keycloakData.length > 0 && "resource" in keycloakData[0]) {
      permissions = keycloakData.map((item) => ({
        resource: item.resource!,
        scopes: item.scopes,
      }));
    } else {
      permissions = resources.map((res, i) => ({
        resource: res,
        scopes: i < keycloakData.length ? keycloakData[i].scopes : [],
      }));
    }

    // Возвращаем массив напрямую, без обёртки
    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Failed to fetch permissions:", error);
    return NextResponse.json([], { status: 500 });
  }
}
