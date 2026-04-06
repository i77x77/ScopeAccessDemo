"use client";

import { usePermissions } from "../hooks";
import { PermissionsArray } from "../types";

interface Document {
  id: number;
  title: string;
  date: string;
}

function MainPage({ permissions }: { permissions: PermissionsArray }) {
  const { hasPermission } = usePermissions(permissions);
  console.info(permissions);
  const documents: Document[] = [
    { id: 1, title: "Документ 1", date: "2026-04-03" },
    { id: 2, title: "Документ 2", date: "2026-04-02" },
  ];

  if (!hasPermission("admin-user", "view")) {
    return <div className="p-6">У вас нет доступа к админке</div>;
  }

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>

      {hasPermission("admin-user", "create") && (
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Добавить документ
        </button>
      )}

      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">ID</th>
            <th className="px-4 py-2 text-left border-b">Название</th>
            <th className="px-4 py-2 text-left border-b">Дата</th>
            <th className="px-4 py-2 text-left border-b">Действия</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{doc.id}</td>
              <td className="px-4 py-2 border-b">{doc.title}</td>
              <td className="px-4 py-2 border-b">{doc.date}</td>
              <td className="px-4 py-2 border-b space-x-2">
                {hasPermission("admin-user", "edit") && (
                  <button className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                    Редактировать
                  </button>
                )}
                {hasPermission("admin-user", "delete") && (
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Удалить
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
