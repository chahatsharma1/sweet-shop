import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { register, clearAuthError } from "@/state/auth/Action.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Eye, EyeOff, Info } from "lucide-react";
import {Toaster} from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearAuthError());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) {
            dispatch(clearAuthError());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;
        dispatch(register(formData, navigate));
    };

    return (
        <div className="bg-background dark:bg-background text-foreground flex flex-col items-center gap-8 p-4 pt-14 sm:pt-14 font-outfit">
            <Toaster position="top-center" />
            <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md">
                <Card className="shadow-lg border-border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
                        <CardDescription>Enter your details below to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <Motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </Motion.div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline font-semibold hover:text-primary">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </Motion.div>

            <div className="max-w-md w-full flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-foreground">
                        Please note: The server may take up to 60 seconds to start when idle. Thank you for your patience!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;