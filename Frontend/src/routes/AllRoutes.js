import { Routes, Route, Navigate } from "react-router-dom";
import SearchStudent from "../pages/Students/SearchStudent";
import AdminHome from "../pages/AdminHome/AdminHome";
import SignIn from "../pages/SignIn/Signin";
import AddNewStudent from '../pages/Students/AddNewStudent';
import RemoveTeacher from '../pages/Teacher/RemoveTeacher'
import SearchTeacher from '../pages/Teacher/SearchTeacher'
import AddNewTeacher from "../pages/Teacher/AddNewTeacher";
import AssignTeacher from '../pages/Teacher/AssignTeacher'
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
        <Route path="/admin/students" element={<SearchStudent />} />
        <Route path="/admin/students/addNew" element={<AddNewStudent />} />
        <Route path="/teacher/add" element={<AddNewTeacher />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/teacher/search" element={<SearchTeacher/>} />
        <Route path="/teacher/remove" element={<RemoveTeacher/>} />
        <Route path="/teacher/assign" element={<AssignTeacher/>} />

        <Route path="/" element={<Navigate to="/admin" replace />} />

      </Routes>
    );
    return routes;
  };
  
