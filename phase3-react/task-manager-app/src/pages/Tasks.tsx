"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { TaskTable } from "@/components/task-table"
import { AddTaskModal } from "@/components/add-task-modal"
import { ViewTaskModal } from "@/components/view-task-modal" // <-- Import here

type Task = {
  id: number
  name: string
  status: "To-Do" | "Completed"
  date: string
}

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

async function fetchTasks() {
  const res = await fetch("https://dummyjson.com/todos?limit=10")
  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  const data = await res.json()
  return data.todos.map((todo: any) => ({
    id: todo.id,
    name: todo.todo,
    status: todo.completed ? "Completed" : "To-Do",
    date: `2023-10-${String(todo.id).padStart(2, "0")}`,
  }))
}

export default function Tasks() {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: fetchedTasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: !!user,
  })

  useEffect(() => {
    if (fetchedTasks.length) {
      setTasks(fetchedTasks)
    }
  }, [fetchedTasks])

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      navigate("/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (err) {
      console.error("Failed to parse user:", err)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      className: "text-white bg-zinc-900",
    })
    navigate("/login")
  }

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === newTask.id)
      return exists ? prev.map((t) => (t.id === newTask.id ? newTask : t)) : [...prev, newTask]
    })
    setEditingTask(null)
    setModalOpen(false)
    setViewModalOpen(false)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    toast({
      title: "Task deleted",
      description: "The task has been deleted.",
    })
  }

  const getUserInitials = () => {
    if (!user) return "U"
    return (user.firstName?.[0] + user.lastName?.[0])?.toUpperCase() || user.username.slice(0, 2).toUpperCase()
  }

  const getDisplayName = () => user?.firstName || user?.username || "User"

  if (isLoading || !user) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 bg-[#080f17] text-white border-b border-gray-800">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className="ml-auto px-3">
              <Avatar>
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="flex-1 p-6 bg-[#080f17] text-white flex items-center justify-center">
            Loading tasks...
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 bg-[#080f17] text-white border-b border-gray-800">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="ml-auto px-3 flex items-center gap-4">
            <button
              onClick={() => {
                setEditingTask(null)
                setModalOpen(true)
              }}
              className="text-sm px-3 py-1 rounded border border-[#c1f17e] text-[#c1f17e] hover:bg-[#c1f17e] hover:text-black transition"
            >
              + Add Task
            </button>
            <Avatar>
              {user?.image ? (
                <AvatarImage src={user.image} alt={getDisplayName()} />
              ) : null}
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 p-6 bg-[#080f17] text-white">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Your Tasks</h1>
          </div>

          <Tabs defaultValue="tasks">
            <TabsList className="border-b border-gray-800 bg-transparent w-full justify-start h-auto p-0 mb-6">
              <TabsTrigger
                value="tasks"
                className="px-4 py-2 data-[state=active]:text-[#c1f17e] data-[state=active]:border-b-2 data-[state=active]:border-[#c1f17e] data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
              >
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-0">
              <TaskTable
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onView={(task) => {
                  setEditingTask(task)
                  setViewModalOpen(true)
                }}
                actionButtons={["view", "edit", "delete"]}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Add/Edit Modal */}
        <AddTaskModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open)
            if (!open) setEditingTask(null)
          }}
          userId={user.id}
          onTaskAdded={handleTaskAdded}
          onToast={(args) =>
            toast({
              title: args.title,
              description: args.description,
              variant:
                args.variant === "default" || args.variant === "destructive" || args.variant === null
                  ? args.variant
                  : undefined,
            })
          }
          editingTask={editingTask}
        />

        <ViewTaskModal
          open={viewModalOpen}
          onOpenChange={(open) => {
            setViewModalOpen(open)
            if (!open) setEditingTask(null)
          }}
          task={editingTask}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
