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

const SignInForm = () => {
    const form = useForm();
    const { login } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/sign-in", data);
            const userData = response.data;

            console.log("Signed in user:", userData);
            login(userData);
            navigate("/")


        } catch (error) {
            console.error("Sign-in failed:", error);
            // Optionally: show error message to user
        }
    };

    const fields = [
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
        },
        {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "••••••••",
        },
    ];

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-center text-primary">
                    Welcome Back
                </h2>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {fields.map(({ name, type, label, placeholder }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input type={type} placeholder={placeholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </Form>

                <p className="text-sm text-center text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link to="/sign-up" className="text-primary font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;
