"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { TaskTable } from "@/components/task-table"
import { AddTaskModal } from "@/components/add-task-modal"
import { ViewTaskModal } from "@/components/view-task-modal"
import { UserProfileModal } from "@/components/user-profile-modal"

type TaskStatus = "To-Do" | "Completed"

type Task = {
  id: number
  name: string
  status: TaskStatus
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

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("https://dummyjson.com/todos?limit=10")
  if (!res.ok) throw new Error("Failed to fetch tasks")
  const data = await res.json()
  return data.todos.map((todo: any) => ({
    id: todo.id,
    name: todo.todo,
    status: todo.completed ? "Completed" : "To-Do",
    date: `2023-10-${String(todo.id).padStart(2, "0")}`,
  }))
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: fetchedTasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: !!user,
  })

  useEffect(() => {
    if (fetchedTasks.length) setTasks(fetchedTasks)
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
    } catch (error) {
      console.error("Failed to parse user data:", error)
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
      const exists = prev.some((t) => t.id === newTask.id)
      return exists ? prev.map((t) => (t.id === newTask.id ? newTask : t)) : [...prev, newTask]
    })
    setEditingTask(null)
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
    return user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user.username.slice(0, 2).toUpperCase()
  }

  const getDisplayName = () => {
    return user?.firstName || user?.username || "User"
  }

  const todoCount = tasks.filter((t) => t.status === "To-Do").length
  const completedCount = tasks.filter((t) => t.status === "Completed").length

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
              <Avatar><AvatarFallback>...</AvatarFallback></Avatar>
            </div>
          </header>
          <main className="flex-1 p-6 bg-[#080f17] text-white flex items-center justify-center">
            Loading tasks...
          </main>
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
            <div className="cursor-pointer" onClick={() => setProfileModalOpen(true)}>
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} alt={getDisplayName()} />
                ) : (
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-[#080f17] text-white">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Welcome to Taskify, {getDisplayName()}</h1>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="border-b border-gray-800 bg-transparent w-full justify-start p-0 mb-6">
              <TabsTrigger
                value="overview"
                className="px-4 py-2 data-[state=active]:text-[#c1f17e] data-[state=active]:border-b-2 data-[state=active]:border-[#c1f17e] data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
              >
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-[#080f17] border border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-400">To-Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{todoCount}</p>
                  </CardContent>
                </Card>

                <Card className="bg-[#080f17] border border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-400">Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{completedCount}</p>
                  </CardContent>
                </Card>
              </div>

              <TaskTable
                tasks={tasks}
                onView={(task) => {
                  setEditingTask(task)
                  setViewModalOpen(true)
                }}
                actionButtons={["view"]}
              />
            </TabsContent>
          </Tabs>
        </main>

        <AddTaskModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open)
            if (!open) setEditingTask(null)
          }}
          userId={user.id}
          onTaskAdded={handleTaskAdded}
          onToast={(args) => {
            toast({
              ...args,
              variant: ["default", "destructive", null].includes(args.variant ?? "")
                ? (args.variant as any)
                : undefined,
            })
          }}
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
        <UserProfileModal
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          user={user}
          onUpdate={(updatedUser) => {
            // Ensure updatedUser has all required User properties
            setUser((prev) => ({
              ...prev!,
              ...updatedUser,
            }))
            localStorage.setItem("user", JSON.stringify({
              ...user,
              ...updatedUser,
            }))
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
