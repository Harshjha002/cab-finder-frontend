import { Button } from "../ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const OwnerInfo = ({ user, refreshUser }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
    });

    useEffect(() => {
        if (open) {
            setFormData({
                username: user.username,
                email: user.email,
                phone: user.phone,
                location: user.location,
            });
        }
    }, [open, user]);

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };




    const handleSubmit = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/api/user/${user.id}`, formData);

            toast.success("Profile updated successfully!", {
                duration: 3000,
            });

            setOpen(false);

            setUser((prev) => ({ ...prev, ...res.data }));
            localStorage.setItem("cab_finder_user", JSON.stringify({ ...user, ...res.data }));
            refreshUser?.();

            setTimeout(() => navigate(0), 3000); 
        } catch (error) {
            toast.error("Failed to update profile", {
                description: error?.response?.data?.message || "Something went wrong.",
                duration: 4000,
            });
        }
    };


    return (
        <div className="mt-10 bg-background border rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="w-32 h-32 flex-shrink-0">
                <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt="User Avatar"
                    className="rounded-full border border-primary w-full h-full object-cover"
                />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-semibold text-primary">{user.username}</h2>
                <div className="text-muted-foreground space-y-1">
                    <p><span className="font-medium">📧 Email:</span> {user.email}</p>
                    <p><span className="font-medium">📱 Phone:</span> {user.phone}</p>
                    <p><span className="font-medium">📍 Location:</span> {user.location}</p>
                    <p><span className="font-medium">🚖 Cabs Owned:</span> {user.cabs?.length || 0}</p>

                    {/* Edit Button + Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white transition">
                                Edit Info
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl shadow-xl">
                            <DialogHeader>
                                <DialogTitle>Edit Your Info</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                                <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                                <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                                <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                            </div>
                            <DialogFooter className="mt-4">
                                <Button onClick={handleSubmit}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default OwnerInfo;
