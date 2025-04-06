
import { useAuth } from "../Context/AuthContext"
import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { toast } from "sonner";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../components/ui/dialog";
const HomePage = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser } = useAuth()

    const handleSubmit = async () => {
        setOpen(false);
        try {
            const res = await axios.put(`http://localhost:8080/api/user/${user.id}/upgrade-to-owner`)
            toast.success("Upgraded to owner:", {
                duration: 3000,
            })

            setUser({ ...user, owner: true });



        } catch (error) {
            console.error("Failed to upgrade:", error)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-10">
            <div className="bg-card shadow-xl rounded-3xl p-8 sm:p-10 max-w-2xl w-full text-center space-y-6 border border-border">
                <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                    🚖 Cab Finder
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                    Whether you're looking for a ride or ready to be a cab owner — start your journey here.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
                    <Link to="/cab-finder" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto">Find a Cab</Button>
                    </Link>

                    {user ? (
                        user.owner ? (
                            <Link to={`/dashboard/${user.id}`} className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="primary" size="lg">
                                        want to  Be owner?
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>Want to be a owner?</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-sm text-muted-foreground">
                                        want to be a owner
                                    </p>
                                    <DialogFooter className="mt-4">
                                        <Button variant="outline">Cancel</Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleSubmit}
                                        >
                                            Confirm yess
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )
                    ) : (
                        <Link to="/sign-in" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Please Sign In
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="text-xs text-muted-foreground pt-4">
                    © {new Date().getFullYear()} Cab Finder. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default HomePage
