import React from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast } from "sonner";

const SignInForm = () => {
    const form = useForm()
    const { login } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/sign-in", data)
            const userData = response.data
            console.log("Signed in user:", userData)

            login(userData)
            toast.success("Welcome back!")
            navigate("/")
        } catch (error) {
            console.error("Sign-in failed:", error)
            toast.error("Sign-in failed", {
                description: error?.response?.data?.message || "Invalid credentials.",
                duration: 4000,
            })
        }
    }

    const fields = [
        { name: "email", type: "email", label: "Email", placeholder: "you@example.com" },
        { name: "password", type: "password", label: "Password", placeholder: "••••••••" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground mt-1">Sign in to continue</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {fields.map(({ name, type, label, placeholder }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">{label}</FormLabel>
                                        <FormControl>
                                            <Input type={type} placeholder={placeholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full font-semibold text-base">
                            Sign In
                        </Button>
                    </form>
                </Form>

                <p className="text-sm text-center text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link to="/sign-up" className="text-primary underline hover:text-primary/80 transition">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignInForm