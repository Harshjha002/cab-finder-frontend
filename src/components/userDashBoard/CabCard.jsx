import { Button } from "../ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const CabCard = ({ cab, onDelete, onUpdate }) => {
    const { user } = useAuth()
    const [openEdit, setOpenEdit] = useState(false);
    const [formData, setFormData] = useState({ ...cab });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/api/cab/${user.id}/${cab.id}/update-cab`, formData);
            toast.success("Cab updated!");
            onUpdate(res.data);
            setOpenEdit(false);
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/cab/${user.id}/${cab.id}/delete-cab`);
            toast.success("Cab deleted");
            onDelete(cab.id);
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="bg-card rounded-2xl p-4 shadow-md border flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-primary">{cab.model}</h3>
            <p className="text-muted-foreground">Seats: {cab.seatCapacity}</p>
            <p className="text-muted-foreground">Type: {cab.type}</p>
            <p className="text-muted-foreground">Fare/km: ₹{cab.farePerKm}</p>
            <p className="text-muted-foreground">Fare/day: ₹{cab.farePerDay}</p>

            <div className="flex justify-end gap-2 mt-2">
                {/* Edit Dialog */}
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Cab</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Input name="model" value={formData.model} onChange={handleChange} placeholder="Model" />
                            <Input name="seatCapacity" type="number" value={formData.seatCapacity} onChange={handleChange} placeholder="Seat Capacity" />
                            <Input name="type" value={formData.type} onChange={handleChange} placeholder="Cab Type" />
                            <Input name="farePerKm" type="number" value={formData.farePerKm} onChange={handleChange} placeholder="Fare per Km" />
                            <Input name="farePerDay" type="number" value={formData.farePerDay} onChange={handleChange} placeholder="Fare per Day" />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button onClick={handleUpdate}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-xl">
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete this cab? This action cannot be undone.
                        </p>
                        <DialogFooter className="mt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};

export default CabCard;
