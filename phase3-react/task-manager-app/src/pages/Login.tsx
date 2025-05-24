"use client"

import { useNavigate, Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      return response.json()
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data))

      toast({
        title: "Login successful",
        description: "Welcome back to Taskify!",
        className: "text-white bg-zinc-900",
      })

      navigate("/dashboard")
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        className: "text-white bg-zinc-900",
        description:
          error instanceof Error ? error.message : "Please check your credentials and try again",
      })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0d1117] text-white">
      <div className="absolute top-6 left-6">
        <img src="logo.svg" alt="Logo" />
      </div>
      <div className="w-full max-w-md px-8">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Login</h1>
          <p className="text-sm text-gray-400">Login to start managing your tasks efficiently.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter the username"
                      {...field}
                      className="bg-[#161b22] text-white placeholder:text-gray-500 border border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter the password"
                      {...field}
                      className="bg-[#161b22] text-white placeholder:text-gray-500 border border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-xs text-[#58a6ff] hover:text-[#79c0ff]">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#C1F17E] hover:bg-[#a1c66c] text-black"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline text-[#58a6ff] hover:text-[#79c0ff]">
            Signup
          </Link>
        </div>
      </div>
    </main>
  )
}
