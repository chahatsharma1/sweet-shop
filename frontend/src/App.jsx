import {Routes, Route} from "react-router-dom";
import React from 'react';
import Layout from '@/components/Layout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import Signup from "@/pages/auth/Signup.jsx";
import Login from "@/pages/auth/Login.jsx";
import UserDashboard from "@/pages/user/UserDashboard.jsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/register" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<UserDashboard/>} />
                <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            </Route>
        </Routes>
    );
}

export default App;