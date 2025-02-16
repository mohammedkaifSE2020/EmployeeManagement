import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Home from "../pages/Home"
import Employeelist from "../pages/EmployeeList"
import Create from "../pages/Create"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Update from "../pages/Update"
import Logout from "../pages/Logout"
import PrivateRoute from "./PrivateRoute"

function AppRoute() {
  return (
    <Routes>
      {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute redirectPath="/signup" />}>
        <Route path="/employeelist" element={<Employeelist />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  )
}

export default AppRoute