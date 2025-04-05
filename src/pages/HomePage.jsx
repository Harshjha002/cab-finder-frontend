import DialogCreater from "../components/base/Dialog"
import { useAuth } from "../Context/AuthContext"
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

const HomePage = () => {
    const { user } = useAuth()

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`/${user.id}/upgrade-to-owner`)
            console.log("Upgraded to owner:", res.data)
            // Optional: Refresh or update context
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
                            <DialogCreater
                                trigger="Become Owner"
                                title="Upgrade to Owner"
                                description="Click the button below to upgrade your account to a cab owner."
                                submittext="Upgrade"
                                handleSubmit={handleSubmit}
                                Componet={() => null}
                            />
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
