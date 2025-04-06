import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ContactOwner = () => {
    const { cabId } = useParams();
    const [cab, setCab] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchCab = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/cab/${cabId}`);
                setCab(res.data);
            } catch (err) {
                console.error("Failed to fetch cab:", err);
            }
        };

        fetchCab();
    }, [cabId]);

    const handleCopy = () => {
        if (cab?.owner?.phone) {
            navigator.clipboard.writeText(cab.owner.phone);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    if (!cab) {
        return <p className="text-center mt-20 text-muted-foreground">Fetching cab details...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
            <h1 className="text-4xl font-bold text-primary mb-10 text-center">
                🚖 Contact Cab Owner
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-muted p-8 rounded-2xl shadow-lg border border-border">
                {/* Owner Image & Info */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <img
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        alt="Owner"
                        className="w-32 h-32 rounded-full border-4 border-primary shadow-sm"
                    />
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-primary">👤 {cab.owner.username}</h2>
                        <p className="text-muted-foreground">{cab.owner.email}</p>
                        <p>📍 {cab.owner.location}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <a
                            href={`tel:${cab.owner.phone}`}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow transition"
                        >
                            📞 Call Owner
                        </a>
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
                        >
                            📋 {copied ? "Copied!" : "Copy Number"}
                        </button>
                    </div>
                </div>

                {/* Cab Info */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary mb-4">🚗 Cab Details</h2>
                    <p><strong>Model:</strong> {cab.model}</p>
                    <p><strong>Type:</strong> {cab.type}</p>
                    <p><strong>Seats:</strong> {cab.seatCapacity}</p>
                    <p><strong>Fare/km:</strong> ₹{cab.farePerKm}</p>
                    <p><strong>Fare/day:</strong> ₹{cab.farePerDay}</p>
                    <p><strong>Available:</strong> {cab.availability ? "✅ Yes" : "❌ No"}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactOwner;
