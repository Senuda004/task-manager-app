"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Task {
  id: number
  name: string
  status: "To-Do" | "Completed"
  date: string
}

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: number
  onTaskAdded: (task: Task) => void
  onToast: (args: { title: string; description: string; variant?: string }) => void
  editingTask?: Task | null
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onOpenChange,
  userId,
  onTaskAdded,
  onToast,
  editingTask = null,
}) => {
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskStatus, setNewTaskStatus] = useState<"To-Do" | "Completed">("To-Do")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setNewTaskName(editingTask.name)
      setNewTaskStatus(editingTask.status)
    } else {
      setNewTaskName("")
      setNewTaskStatus("To-Do")
    }
  }, [editingTask])

  const handleAddOrUpdateTask = async () => {
    if (!newTaskName.trim()) {
      onToast({
        title: "Invalid Input",
        description: "Task name cannot be empty",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const task: Task = editingTask
        ? {
            ...editingTask,
            name: newTaskName,
            status: newTaskStatus,
          }
        : {
            id: Date.now(),
            name: newTaskName,
            status: newTaskStatus,
            date: new Date().toISOString().slice(0, 10),
          }

      onTaskAdded(task)
      setNewTaskName("")
      setNewTaskStatus("To-Do")
      onOpenChange(false)
    } catch (error) {
      onToast({
        title: "Error",
        description: "Failed to add/update task",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the task details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label htmlFor="task-name" className="block text-sm font-medium text-gray-300 mb-1">
              Task Name
            </label>
            <Input
              id="task-name"
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter task name"
              autoFocus
              disabled={isSubmitting}
              className="bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-c1f17e focus:ring-c1f17e"
            />
          </div>
          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <Select
              value={newTaskStatus}
              onValueChange={(value) => setNewTaskStatus(value as "To-Do" | "Completed")}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="task-status"
                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:border-c1f17e focus:ring-c1f17e"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-gray-100 border-gray-700">
                <SelectItem value="To-Do" className="hover:bg-c1f17e hover:text-black">
                  To-Do
                </SelectItem>
                <SelectItem value="Completed" className="hover:bg-c1f17e hover:text-black">
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddOrUpdateTask}
            disabled={isSubmitting}
            className="bg-c1f17e text-black hover:bg-amber-400"
          >
            {isSubmitting ? (editingTask ? "Updating..." : "Adding...") : editingTask ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
