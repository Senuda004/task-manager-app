import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

// API task shape exactly as backend returns it
export interface ApiTask {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  date?: string; // optional date from API
}

// UI-friendly task shape used in components
export interface Task {
  id: number;
  name: string;               // mapped from todo
  status: "To-Do" | "Completed";  // derived from completed boolean
  date: string;               // formatted date string
}

// Helper function to format date string or fallback to today's date
const formatDate = (rawDate?: string): string => {
  if (!rawDate) return new Date().toLocaleDateString();
  return new Date(rawDate).toLocaleDateString();
};

export const useUserTasks = (userId: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const data = await api.fetchTasks(userId);
      // If the API returns an array of tasks directly
      return data.map((apiTask: ApiTask) => ({
        id: apiTask.id,
        name: apiTask.todo,
        status: apiTask.completed ? "Completed" : "To-Do",
        date: formatDate(apiTask.date),
      }));
    },
  });
};
