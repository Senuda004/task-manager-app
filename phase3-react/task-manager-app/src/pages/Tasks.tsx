import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function Tasks() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 p-6 bg-background text-foreground">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => alert("Open Add Task Modal")}
          >
            + Add Task
          </button>
        </div>

        {/* Task Table */}
        <div className="overflow-auto rounded-lg shadow border border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left px-6 py-3">Task</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Due Date</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700 text-gray-300">
              <tr>
                <td className="px-6 py-4">Design login screen</td>
                <td className="px-6 py-4">To-Do</td>
                <td className="px-6 py-4">2025-06-01</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Build sidebar component</td>
                <td className="px-6 py-4">Completed</td>
                <td className="px-6 py-4">2025-05-20</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
