import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Memberships from "./pages/Memberships";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Classes from "./pages/Classes";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* ================================
            GYM MANAGEMENT SYSTEM
        ================================= */}

        <Route path="/dashboard" element={<Layout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Members */}
          <Route path="members" element={<Members />} />

          {/* Trainers */}
          <Route path="trainers" element={<Trainers />} />

          {/* Memberships */}
          <Route path="memberships" element={<Memberships />} />

          {/* Attendance */}
          <Route path="attendance" element={<Attendance />} />

          {/* Payments */}
          <Route path="payments" element={<Payments />} />

          {/* Classes */}
          <Route path="classes" element={<Classes />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;