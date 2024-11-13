import React from "react";
import RootLayOut from "./components/roots/RootLayOut";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/dashboard/overview/Overview";
import Messages from "./pages/dashboard/messages/Messages";
import Notifications from "./pages/dashboard/notifications/Notifications";
import Analytics from "./pages/dashboard/analytics/Analytics";
import Reports from "./pages/dashboard/reports/Reports";
import Schedule from "./pages/dashboard/schedule/Schedule";
import Settings from "./pages/dashboard/settings/Settings";
import Trips from "./pages/dashboard/trips/Trips";
import Vehicles from "./pages/dashboard/vehicles/Vehicles";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Profile from "./pages/dashboard/profile/Profile";
import VehicleDetails from "./pages/dashboard/vehicles/VehicleDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayOut />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="messages" element={<Messages />} />
          <Route path="vehicle-details/:id" element={<VehicleDetails/>}/>
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trips" element={<Trips />} />
          <Route path="vehicles" element={<Vehicles />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
