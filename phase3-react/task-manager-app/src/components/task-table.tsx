import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
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
  onEdit?: (task: Task) => void
  onDelete?: (taskId: number) => void
  onView?: (task: Task) => void
  actionButtons: Array<"view" | "edit" | "delete">
}

export function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onView,
  actionButtons,
}: TaskTableProps) {
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

  const getStatusColor = (status: "Completed" | "To-Do") =>
    status === "Completed" ? "text-green-400" : "text-gray-400"

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ChevronDown className="ml-1 h-4 w-4 opacity-50" aria-hidden="true" />
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" aria-label="sorted ascending" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" aria-label="sorted descending" />
    )
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader className="bg-[#0c1520]">
          <TableRow className="hover:bg-[#0c1520] border-gray-800">
            {(["name", "status", "date"] as SortField[]).map((field) => (
              <TableHead
                key={field}
                className="text-gray-400 font-medium cursor-pointer select-none"
                onClick={() => handleSort(field)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleSort(field)
                  }
                }}
                aria-sort={
                  sortField === field
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <div className="flex items-center">
                  {field === "name" && "Task Name"}
                  {field === "status" && "Status"}
                  {field === "date" && "Date"}
                  <SortIcon field={field} />
                </div>
              </TableHead>
            ))}
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
                {actionButtons.includes("view") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView?.(task)}
                    className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black"
                    aria-label={`View task ${task.name}`}
                  >
                    View
                  </Button>
                )}
                {actionButtons.includes("edit") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit?.(task)}
                    className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                    aria-label={`Edit task ${task.name}`}
                  >
                    Edit
                  </Button>
                )}
                {actionButtons.includes("delete") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete?.(task.id)}
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-black"
                    aria-label={`Delete task ${task.name}`}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
