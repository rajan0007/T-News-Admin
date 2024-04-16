import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Admin from "./component/Admin";
import Blog from "./component/Blog";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
