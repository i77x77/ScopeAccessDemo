import MainPage from "../components/MainPage";
import { PermissionsArray } from "../types";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/permissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resources: ["admin-user", "company"],
    }),
    next: { revalidate: 0 },
  });

  const data: PermissionsArray = await response.json();

  return <MainPage permissions={data} />;
}
