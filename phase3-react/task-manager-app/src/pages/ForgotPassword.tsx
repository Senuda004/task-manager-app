"use client"

import { useNavigate, Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true }
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now login with your new password.",
        className: "text-white bg-zinc-900",
      })

      navigate("/login")
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: "We couldn't reset your password. Please check your username and try again.",
        className: "text-white bg-zinc-900",
      })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPasswordMutation.mutate(values)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background dark:bg-[#0d1117] text-foreground dark:text-white">
      <div className="absolute top-6 left-6">
        <img src="logo.svg" alt="Logo" />
      </div>
      <div className="w-full max-w-md px-8">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground dark:text-white">Reset Password</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Enter your username and new password below.</p>
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
                      placeholder="Enter your username"
                      {...field}
                      className="bg-input text-foreground dark:bg-[#161b22] dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 border border-border dark:border-gray-700"
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
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      className="bg-input text-foreground dark:bg-[#161b22] dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 border border-border dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                      className="bg-input text-foreground dark:bg-[#161b22] dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 border border-border dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground dark:bg-[#C1F17E] dark:text-black dark:hover:bg-[#a5d568]"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm text-muted-foreground dark:text-gray-400">
          Remember your password?{" "}
          <Link to="/login" className="underline text-primary dark:text-[#58a6ff] hover:text-primary/90 dark:hover:text-[#79c0ff]">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  )
}
