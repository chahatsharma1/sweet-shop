import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Candy, Sun, Moon } from "lucide-react";
import { logout } from "@/state/auth/Action.js";
import { jwtDecode } from 'jwt-decode';

const Layout = () => {
    const jwt = localStorage.getItem("jwt");
    const [userRole, setUserRole] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        if (jwt) {
            try {
                const decodedToken = jwtDecode(jwt);
                setUserRole(decodedToken.role);
            } catch {}
        }
    }, [jwt]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
                <div className="border bg-card/60 backdrop-blur-lg rounded-full shadow-lg">
                    <div className="px-6 py-3 flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-primary p-2 rounded-full">
                                <Candy className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground">Sweet Shop</span>
                        </Link>

                        <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5 transition-transform duration-300" />
                                ) : (
                                    <Moon className="h-5 w-5 transition-transform duration-300" />
                                )}
                            </Button>

                            {jwt ? (
                                <>
                                    {location.pathname.includes('dashboard') ? (
                                        <Button size="sm" onClick={handleLogout}>Logout</Button>
                                    ) : (
                                        <Link to={userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                                            <Button size="sm">Dashboard</Button>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    {location.pathname !== '/login' && (
                                        <Link to="/login">
                                            <Button variant="ghost" size="sm">Login</Button>
                                        </Link>
                                    )}
                                    {location.pathname !== '/register' && (
                                        <Link to="/register">
                                            <Button size="sm">Signup</Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;