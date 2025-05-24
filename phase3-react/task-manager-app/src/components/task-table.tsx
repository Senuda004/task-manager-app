import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Task = {
  id: number
  name: string
  status: "Completed" | "To-Do"
  date: string
}

type SortField = "name" | "status" | "date"
type SortDirection = "asc" | "desc"

interface TaskTableProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
}

export function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getStatusColor = (status: "Completed" | "To-Do") => {
    return status === "Completed" ? "text-green-400" : "text-gray-400"
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader className="bg-[#0c1520]">
          <TableRow className="hover:bg-[#0c1520] border-gray-800">
            <TableHead className="text-gray-400 font-medium cursor-pointer" onClick={() => handleSort("name")}>
              <div className="flex items-center">
                Task Name <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-gray-400 font-medium cursor-pointer" onClick={() => handleSort("status")}>
              <div className="flex items-center">
                Status <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-gray-400 font-medium cursor-pointer" onClick={() => handleSort("date")}>
              <div className="flex items-center">
                Date <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-gray-400 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-[#0c1520] border-gray-800">
              <TableCell>{task.name}</TableCell>
              <TableCell className={getStatusColor(task.status)}>{task.status}</TableCell>
              <TableCell>{task.date}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task)}
                  className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-black"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
