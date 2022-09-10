import { Routes, Route, Navigate } from "react-router-dom";
import AllStudents from "../pages/Students/AllStudents";
import AdminHome from "../pages/AdminHome/AdminHome";
import SignIn from "../pages/SignIn/Signin";
import AddNewStudent from '../pages/Students/AddNewStudent';
import AddTeacher from '../pages/Teacher/AddTeacher'
import RemoveTeacher from '../pages/Teacher/RemoveTeacher'
import AssignTeacher from '../pages/Teacher/AssignTeacher'
import SearchTeacher from '../pages/Teacher/SearchTeacher'

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
        <Route path="/teacher/add" element={<AddTeacher/>} />
        <Route path="/teacher/search" element={<SearchTeacher/>} />
        <Route path="/teacher/remove" element={<RemoveTeacher/>} />
        <Route path="/teacher/assign" element={<AssignTeacher/>} />

        <Route path="/" element={<Navigate to="/admin" replace />} />

      </Routes>
    );
    return routes;
  };
  
