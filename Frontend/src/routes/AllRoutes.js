import { Routes, Route, Navigate } from "react-router-dom";
import AllStudents from "../pages/Students/AllStudents";
import AdminHome from "../pages/AdminHome/AdminHome";
import SignIn from "../pages/SignIn/Signin";


export const LoggedOutRoutes = () => {
  let routes;

  routes = (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );

  return routes;
};

export const LoggedInRoutes = () => {
    let routes;
    routes = (
      <Routes>
        <Route path="/admin/student" element={<AllStudents />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
    return routes;
  };
  
