import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";

const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Public Portfolio Single-Page (Home) */}
        <Route path="/" element={<PortfolioPage />} />

        {/* 2. Public Certifications Gallery */}
        <Route path="/certifications" element={<CertificationsPage />} />

        {/* Private Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
