
import { useAuth } from "../Context/AuthContext"
import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { toast } from "sonner";
import { useRef } from "react"
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
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        setOpen(false);
        try {
            const formData = new FormData();
            formData.append("image", image);

            await axios.put(
                `http://localhost:8080/api/user/${user.id}/upgrade-to-owner`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Upgraded to owner!", { duration: 3000 });
            setUser({ ...user, owner: true });
        } catch (error) {
            console.error("Failed to upgrade:", error);
            toast.error("Upgrade failed.");
        }
    };


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
                    <Link to="/cab-finder/find-cab-form" className="w-full sm:w-auto">
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
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="primary" size="lg">
                                        Want to Be Owner?
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="rounded-xl max-w-md w-full">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl text-center">Become an Owner</DialogTitle>
                                    </DialogHeader>

                                    <div className="space-y-4 mt-2 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Upload a profile image to complete your owner request.
                                        </p>

                                        <label className="block mx-auto w-32 h-32 border-2 border-dashed border-primary rounded-full cursor-pointer hover:bg-muted transition flex items-center justify-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={fileInputRef}
                                                className="hidden"
                                            />
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <span className="text-xs text-muted-foreground px-2">
                                                    Click to upload
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    <DialogFooter className="mt-6 flex justify-between">
                                        <Button variant="ghost" onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="default"
                                            disabled={!preview}
                                            onClick={handleSubmit}
                                            className="bg-primary text-white hover:bg-primary/90 transition"
                                        >
                                            Submit Request
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
