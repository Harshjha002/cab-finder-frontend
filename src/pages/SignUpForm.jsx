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
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const form = useForm();

    const onSubmit = (data) => {
        console.log("Sign Up Payload:", data);
        // TODO: Connect to backend
    };

    const fields = [
        { name: "username", label: "Username", type: "text", placeholder: "johndoe" },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "phone", label: "Phone", type: "tel", placeholder: "1234567890" },
        { name: "location", label: "Location", type: "text", placeholder: "New York" },
        { name: "password", label: "Password", type: "password", placeholder: "********" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/40 to-background px-4 py-8">
            <div className="bg-card rounded-2xl shadow-xl p-8 w-full max-w-md border">
                <h2 className="text-2xl font-semibold text-center mb-6 text-primary">Create Your Account</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {fields.map(({ name, label, type, placeholder }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
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

                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <p className="text-sm text-muted-foreground text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/sign-in" className="text-primary underline hover:text-primary/80 transition">
                                Sign In
                            </Link>
                        </p>

                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm;
