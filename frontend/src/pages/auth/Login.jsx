import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login, clearAuthError } from "@/state/auth/Action.js";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [selectedRole, setSelectedRole] = useState('ROLE_USER');
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

        dispatch(login(formData, selectedRole, navigate));
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="bg-slate-50 dark:bg-background text-foreground flex justify-center p-4 pt-24 sm:pt-24 font-outfit">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md">
                <Card className="shadow-lg border-border/20">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>Select your role and sign in to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={selectedRole} onValueChange={setSelectedRole} className="w-full mb-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="USER">User</TabsTrigger>
                                <TabsTrigger value="ADMIN">Admin</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
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
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
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
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md flex items-center gap-2"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </motion.div>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;