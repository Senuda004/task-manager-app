"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

interface User {
  id: number
  username: string
  password?: string
  image?: string
}

interface UserProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  onUpdate: (updatedUser: User) => void
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onOpenChange,
  user,
  onUpdate,
}) => {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      password: user.password || "",
    },
  })

  useEffect(() => {
    form.reset({
      username: user.username,
      password: user.password || "",
    })
  }, [user, form])

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Failed to update user")

      const updatedUser = await res.json()
      onUpdate(updatedUser)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
        className: "text-white bg-zinc-900",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user.",
        variant: "destructive",
        className: "text-white bg-zinc-900",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your username and password.</DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.username} />
            ) : (
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter username"
                          {...field}
                          className="bg-gray-800 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="bg-gray-800 text-white pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="border border-[#c1f17e] text-[#c1f17e] hover:bg-[#c1f17e] hover:text-black transition"
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
