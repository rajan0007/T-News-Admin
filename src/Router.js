import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import CustomerList from "./component/CustomerList";
import Profile from "./component/Profile";
import ProfessionlList from "./component/ProfessionlList";
import Booking from "./component/Booking";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/professional-list" element={<ProfessionlList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
}
