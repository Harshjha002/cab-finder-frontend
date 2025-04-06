import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, User } from "lucide-react";

const FindedCabListCard = ({ cabs = [] }) => {
    const navigate = useNavigate();

    if (cabs.length === 0) {
        return (
            <div className="text-center text-muted-foreground text-lg mt-10">
                😕 No cabs available for this route.
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {cabs.map((cab) => (
                <div
                    key={cab.id}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                    {/* Cab model */}
                    <h2 className="text-xl font-bold text-primary border-b border-border pb-2">
                        🚘 {cab.model} <span className="text-sm text-muted-foreground">({cab.type})</span>
                    </h2>

                    {/* Main content layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left: Cab details */}
                        <div className="text-sm space-y-2 text-muted-foreground">
                            <p>🪑 <span className="text-foreground font-medium">Seater:</span> {cab.seatCapacity}</p>
                            <p>💸 <span className="text-foreground font-medium">Fare/km:</span> ₹{cab.farePerKm}</p>
                            <p>📅 <span className="text-foreground font-medium">Fare/day:</span> ₹{cab.farePerDay}</p>
                            <p>
                                ✅ <span className="text-foreground font-medium">Available:</span>{" "}
                                <span className={cab.availability ? "text-green-500" : "text-red-500"}>
                                    {cab.availability ? "Yes" : "No"}
                                </span>
                            </p>
                        </div>

                        {/* Right: Owner details + Button */}
                        <div className="text-sm space-y-2 text-muted-foreground">
                            <p className="text-foreground font-semibold mb-1">👤 Owner Details</p>
                            <p className="flex items-center gap-1"><User size={14} /> {cab.owner.username}</p>
                            <p className="flex items-center gap-1"><MapPin size={14} /> {cab.owner.location}</p>
                            <p className="flex items-center gap-1"><Mail size={14} /> {cab.owner.email}</p>
                            <p className="flex items-center gap-1"><Phone size={14} /> {cab.owner.phone}</p>

                            <Button
                                size="sm"
                                className="mt-2"
                                onClick={() => navigate(`/cab-finder/contact-owner/${cab.id}`)}
                            >
                                📞 Contact Owner
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FindedCabListCard;
