import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import AutoCompleteInput from "../components/custom/AutoCompleteInput";

const INDIAN_CITIES = [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai",
    "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur",
    "Indore", "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad", "Guwahati"
];

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Minivan", "Luxury"];
const SEATER_OPTIONS = ["4-Seater", "6-Seater", "8-Seater"];

const CabFinder = () => {
    const navigate = useNavigate();

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [tripType, setTripType] = useState("one-way");
    const [travelDate, setTravelDate] = useState();
    const [returnDate, setReturnDate] = useState();
    const [carType, setCarType] = useState(CAR_TYPES[0]);
    const [seater, setSeater] = useState(SEATER_OPTIONS[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!source || !destination || source === destination || !travelDate) return;

        const params = {
            source,
            destination,
            tripType,
            travelDate: travelDate.toISOString(),
            carType,
            seater,
        };

        if (tripType === "round-trip" && returnDate) {
            params.returnDate = returnDate.toISOString();
        }

        navigate(`/cab-finder/find-cab?${new URLSearchParams(params).toString()}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-background to-muted">
            <div className="w-full max-w-2xl p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-xl space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">Find Your Cab</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AutoCompleteInput
                        label="Source City"
                        value={source}
                        onChange={setSource}
                        options={INDIAN_CITIES}
                        placeholder="Enter source city"
                    />

                    <AutoCompleteInput
                        label="Destination City"
                        value={destination}
                        onChange={setDestination}
                        options={INDIAN_CITIES}
                        placeholder="Enter destination city"
                    />

                    <div className="space-y-2">
                        <Label htmlFor="tripType">Trip Type</Label>
                        <select
                            id="tripType"
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
                        >
                            <option value="one-way">One Way</option>
                            <option value="round-trip">Round Trip</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>{tripType === "round-trip" ? "Travel Date (From)" : "Travel Date"}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    {travelDate ? format(travelDate, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={travelDate}
                                    onSelect={setTravelDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {tripType === "round-trip" && (
                        <div className="space-y-1">
                            <Label>Return Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        {returnDate ? format(returnDate, "PPP") : "Pick a return date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={returnDate}
                                        onSelect={setReturnDate}
                                        initialFocus
                                        disabled={(date) => date < (travelDate || new Date())}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <Label htmlFor="carType">Car Type</Label>
                            <select
                                id="carType"
                                value={carType}
                                onChange={(e) => setCarType(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
                            >
                                {CAR_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="seater">Seater</Label>
                            <select
                                id="seater"
                                value={seater}
                                onChange={(e) => setSeater(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
                            >
                                {SEATER_OPTIONS.map((seat) => (
                                    <option key={seat} value={seat}>
                                        {seat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full mt-4"
                        disabled={!source || !destination || source === destination || !travelDate}
                    >
                        Search Cab
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CabFinder;