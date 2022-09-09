import { Routes, Route, Navigate } from "react-router-dom";
import AllStudents from "../pages/Students/AllStudents";
import AdminHome from "../pages/AdminHome/AdminHome";
import SignIn from "../pages/SignIn/Signin";
import AddNewStudent from '../pages/Students/AddNewStudent';


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
        <Route path="/admin/students" element={<AllStudents />} />
        <Route path="/admin/students/addNew" element={<AddNewStudent />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
    return routes;
  };
  
