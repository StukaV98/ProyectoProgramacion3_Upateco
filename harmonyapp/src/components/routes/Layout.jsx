import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthProvider } from '../components/Contexts/AuthContext';

export default function Layout() {
    return (
        <AuthProvider>
            <div className="layout">
                <NavBar />
                <main className="content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    );
}