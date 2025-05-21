import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const useUserTasks = (userId: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const { data } = await api.get(`/todos/user/${userId}`);
      return data.todos;
    },
  });
};
