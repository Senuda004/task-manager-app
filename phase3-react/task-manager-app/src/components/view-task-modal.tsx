"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Task } from "@/hooks/useTasks"

interface ViewTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
}

export const ViewTaskModal: React.FC<ViewTaskModalProps> = ({
  open,
  onOpenChange,
  task,
}) => {
  const [taskName, setTaskName] = useState("")
  const [taskStatus, setTaskStatus] = useState<"To-Do" | "Completed">("To-Do")
  const [taskDate, setTaskDate] = useState("")

  useEffect(() => {
    if (task) {
      setTaskName(task.name)
      setTaskStatus(task.status)
      setTaskDate(task.date)
    }
  }, [task])

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            View information about this task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm font-medium text-gray-300 mb-1">Task Name</p>
            <p className="bg-gray-800 text-gray-100 p-2 rounded border border-gray-700">
              {taskName}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-1">Status</p>
            <p className="bg-gray-800 text-gray-100 p-2 rounded border border-gray-700">
              {taskStatus}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-1">Date</p>
            <p className="bg-gray-800 text-gray-100 p-2 rounded border border-gray-700">
              {taskDate}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
