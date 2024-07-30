import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddStudent from "./components/AddStudent/index";
import EditStudent from "./components/EditStudent/index";
import Home from "./pages/Home/index";
import Dashboard from "./pages/Dashboard";
import DashboardTwo from "./pages/Dashboard/DashboardTwo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<DashboardTwo />} />
      </Routes>
    </Router>
  );
}

export default App;
