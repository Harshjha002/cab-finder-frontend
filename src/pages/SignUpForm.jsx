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
import { toast } from "sonner";

const SignUpForm = () => {
    const form = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/register", data)
            toast.success(response?.message)
            console.log("Signed up:", response.message, `User ID: ${response.userId}`)
            navigate("/sign-in")
        } catch (error) {
            toast.error("Failed to sign up", {
                description: error?.response?.data?.message || "Something went wrong.",
                duration: 4000,
            })
        }
    }

    const fields = [
        { name: "username", label: "Username", type: "text", placeholder: "johndoe" },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "phone", label: "Phone", type: "tel", placeholder: "1234567890" },
        { name: "location", label: "Location", type: "text", placeholder: "New York" },
        { name: "password", label: "Password", type: "password", placeholder: "********" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background flex items-center justify-center px-4 py-10">
            <div className="bg-card shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md border border-border space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary">Create Account</h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Join us and start your journey!
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {fields.map(({ name, label, type, placeholder }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">{label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={type}
                                                placeholder={placeholder}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full text-base font-semibold">
                            Sign Up
                        </Button>
                    </form>
                </Form>

                <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-primary underline hover:text-primary/80 transition">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpForm