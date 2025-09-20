import { Routes, Route } from "react-router-dom";
import React from 'react';
import Layout from '@/components/Layout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import Signup from "@/pages/auth/Signup.jsx";
import Login from "@/pages/auth/Login.jsx";
import UserDashboard from "@/pages/user/UserDashboard.jsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.jsx";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import UnauthorizedPage from "@/pages/UnauthorizedPage.jsx";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/error" element={<UnauthorizedPage />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['USER']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;