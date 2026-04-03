"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function MainPage() {
  const permissions = useSelector((state: RootState) => state.permissions.data);
  console.log("Permissions from store:", permissions);
  if (
    !permissions.some(
      (perm) => perm.resource === "documents" && perm.scopes.includes("read"),
    )
  ) {
    return (
      <div className="p-6 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          У вас нет доступа к документам
        </h1>
      </div>
    );
  }
  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Документы</h1>

      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Добавить документ
      </button>

      <div className="overflow-x-auto">
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
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b">Документ 1</td>
              <td className="px-4 py-2 border-b">2026-04-03</td>
              <td className="px-4 py-2 border-b space-x-2">
                <button className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                  Редактировать
                </button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Удалить
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">2</td>
              <td className="px-4 py-2 border-b">Документ 2</td>
              <td className="px-4 py-2 border-b">2026-04-02</td>
              <td className="px-4 py-2 border-b space-x-2">
                <button className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                  Редактировать
                </button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;
