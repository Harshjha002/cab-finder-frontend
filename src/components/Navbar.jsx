import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Button } from "./ui/button";
import { ModeToggle } from "./base/modeToggle";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-background/90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    <span className="text-xl font-semibold text-primary">Cab Finder</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <span>Hello, {user.username}</span>
                            {user.owner && (
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(`/dashboard/${user.id}`)}
                                >
                                    Dashboard
                                </Button>
                            )}
                            <Button variant="destructive" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/sign-in">
                                <Button variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400 hover:bg-blue-500 hover:text-white transition">
                                    Sign In
                                </Button>
                            </NavLink>
                            <NavLink to="/sign-up">
                                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white transition">
                                    Sign Up
                                </Button>
                            </NavLink>
                        </>
                    )}
                    <ModeToggle />
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-2 relative">
                    <ModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-muted transition"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {isOpen && (
                        <div className="absolute top-12 right-0 bg-background border rounded-xl shadow-lg p-3 w-44 flex flex-col gap-2 z-50">
                            {user ? (
                                <>
                                    {user.owner && (
                                        <Button
                                            variant="outline"
                                            className="text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400 hover:bg-blue-600 hover:text-white transition font-semibold"
                                            onClick={() => navigate(`/dashboard/${user.id}`)}
                                        >
                                            Dashboard
                                        </Button>
                                    )}
                                    <Button
                                        variant="destructive"
                                        className="w-full justify-start text-sm"
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/sign-in" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" size="sm" className="w-full text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400">
                                            Sign In
                                        </Button>
                                    </NavLink>
                                    <NavLink to="/sign-up" onClick={() => setIsOpen(false)}>
                                        <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            Sign Up
                                        </Button>
                                    </NavLink>

                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
