import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FindedCabListCard from "../components/base/FindedCabListCard";
import axios from "axios";

const CabList = () => {
    const { search } = useLocation();
    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCabs = async () => {
            try {
                const params = new URLSearchParams(search);
                const location = params.get("source");

                if (!location) return;

                const res = await axios.get(`http://localhost:8080/api/cab/search?location=${location}`);
                setCabs(res.data);
            } catch (err) {
                console.error("Failed to fetch cabs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCabs();
    }, [search]);

    return (
        <div className="pt-24 px-4 pb-12 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-8 text-center">
                🚖 Available Cabs
            </h1>

            {loading ? (
                <p className="text-center text-muted-foreground">Loading cabs...</p>
            ) : cabs.length === 0 ? (
                <p className="text-center text-destructive text-lg">No cabs found for this location 😕</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FindedCabListCard cabs={cabs} />
                </div>
            )}
        </div>
    );
};

export default CabList;
