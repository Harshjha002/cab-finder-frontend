import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import CabCard from "./CabCard";
import { useNavigate } from "react-router-dom";

const OwnersCabs = ({ cabs = [], refreshCabs }) => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        model: "",
        seatCapacity: "",
        type: "",
        farePerKm: "",
        farePerDay: "",
    });

    const carTypes = ["SEDAN", "HATCHBACK", "MINI", "LUXURY", "SUV"];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelect = (value) => {
        setFormData(prev => ({
            ...prev,
            type: value,
        }));
    };

    const handleSubmit = async () => {
        setOpen(false);
        try {
            const payload = { ...formData, ownerId: user.id };
            await axios.post(`http://localhost:8080/api/cab/${user.id}/add-cab`, payload);
            toast.success("Cab added successfully!", { duration: 3000 });
            setFormData({
                model: "",
                seatCapacity: "",
                type: "",
                farePerKm: "",
                farePerDay: "",
            });
            refreshCabs?.();
            setTimeout(() => navigate(0), 3000);
        } catch (error) {
            toast.error("Failed to add cab", {
                description: error?.response?.data?.message || "Something went wrong.",
            });
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="bg-background border rounded-2xl shadow-md p-6 md:p-8 flex items-center gap-6">
                <div className="w-20 h-20">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/296/296216.png"
                        alt="Cab Icon"
                        className="rounded-full border border-primary object-cover w-full h-full"
                    />
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-1">Manage Your Cabs</h2>
                    <p className="text-muted-foreground mb-4">Add a new cab to your fleet.</p>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition">+ Add New Cab</Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl shadow-xl">
                            <DialogHeader>
                                <DialogTitle>Add a New Cab</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                                <Input name="model" placeholder="Model" value={formData.model} onChange={handleChange} />
                                <Input name="seatCapacity" type="number" placeholder="Seat Capacity" value={formData.seatCapacity} onChange={handleChange} />
                                <Select onValueChange={handleSelect} value={formData.type}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Cab Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {carTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input name="farePerKm" type="number" placeholder="Fare Per Km" value={formData.farePerKm} onChange={handleChange} />
                                <Input name="farePerDay" type="number" placeholder="Fare Per Day" value={formData.farePerDay} onChange={handleChange} />
                            </div>
                            <DialogFooter className="mt-4">
                                <Button onClick={handleSubmit}>Add Cab</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Cabs Display */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cabs.length === 0 ? (
                    <p className="text-muted-foreground text-center col-span-full">You haven't added any cabs yet.</p>
                ) : (
                    cabs.map((cab) => (
                        <CabCard
                            key={cab.id}
                            cab={cab}
                            onDelete={(id) => refreshCabs?.()}
                            onUpdate={(updatedCab) => refreshCabs?.()}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default OwnersCabs;
