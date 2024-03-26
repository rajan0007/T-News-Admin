import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import CustomerList from "./component/CustomerList";
import Profile from "./component/Profile";
import ProfessionlList from "./component/ProfessionlList";
import Booking from "./component/Booking";
import BookingRequest from "./component/BookingRequest";
import Admin from "./component/Admin";
import Payment from "./component/Payment";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/professional-list" element={<ProfessionlList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-request" element={<BookingRequest />} />
      </Routes>
    </div>
  );
}
