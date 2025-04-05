import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import OwnerInfo from "../components/userDashBoard/OwnerInfo";
import OwnersCabs from "../components/userDashBoard/OwnersCabs";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !user.owner) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground text-lg animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-10">
            {/* Dashboard Header */}
            <div className="space-y-1">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Owner Dashboard</h1>
                <p className="text-muted-foreground text-lg">
                    Hello, <span className="font-semibold">{user.username}</span> 👋
                </p>
            </div>

            {/* Owner Info */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Your Profile</h2>
                <OwnerInfo user={user} />
            </section>

            {/* Cabs Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Your Cabs</h2>
                <OwnersCabs cabs={user.cabs} />
            </section>
        </div>
    );
};

export default Dashboard;
