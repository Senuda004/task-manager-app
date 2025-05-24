// API service functions for interacting with dummyjson.com

// Types
type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

type Task = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

type TasksResponse = {
  todos: Task[]
  total: number
  skip: number
  limit: number
}

// Authentication
async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

// User Profile
async function fetchUserProfile(userId: number) {
  const response = await fetch(`https://dummyjson.com/users/${userId}`)

  if (!response.ok) {
    throw new Error("Failed to fetch user profile")
  }

  return response.json()
}

async function updateUserProfile(userId: number, userData: any) {
  const response = await fetch(`https://dummyjson.com/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user profile")
  }

  return response.json()
}

// Task Management
async function fetchTasks(userId: number): Promise<Task[]> {
  const response = await fetch(`https://dummyjson.com/todos/user/${userId}`)

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  const data: TasksResponse = await response.json()
  return data.todos
}

async function addTask(task: { todo: string; completed: boolean; userId: number }): Promise<Task> {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to add task")
  }

  return response.json()
}

async function updateTask(taskId: number, task: { todo?: string; completed?: boolean }): Promise<Task> {
  const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  return response.json()
}

async function deleteTask(taskId: number): Promise<Task> {
  const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }

  return response.json()
}

// Default export bundling all functions
export default {
  loginUser,
  fetchUserProfile,
  updateUserProfile,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
}
