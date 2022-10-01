import { Routes, Route } from "react-router-dom";
import SearchStudent from "../pages/Students/SearchStudent";
import AdminHome from "../pages/AdminHome/AdminHome";
import SignIn from "../pages/SignIn/Signin";
import AddNewStudent from '../pages/Students/AddNewStudent';
import SearchTeacher from '../pages/Teacher/SearchTeacher'
import AddNewTeacher from "../pages/Teacher/AddNewTeacher";
import AssignTeacher from '../pages/Teacher/AssignTeacher';
import SearchClass from "../pages/Classes/SearchClass";
import AddNewClass from "../pages/Classes/AddNewClass"
import ClassInfo from "../pages/Classes/ClassInfo";
import TeacherInfo from "../pages/Teacher/TeacherInfo";
import EditTeacher from "../pages/Teacher/EditTeacher";
import SectionInfo from '../pages/Classes/SectionInfo'
import MarkStudentAttendance from "../pages/Attendance/MarkStudentAttendance";
import StudentInfo from "../pages/Students/StudentInfo";
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
        <Route path="/students/search" element={<SearchStudent />} />
        <Route path="/students/add" element={<AddNewStudent />} />
        <Route path="/teacher/add" element={<AddNewTeacher />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/teacher/search" element={<SearchTeacher/>} />
        <Route path="/teacher/assign" element={<AssignTeacher/>} />
        <Route path="/teacher/edit/:username" element={<EditTeacher/>} />
        <Route path="/teacher/:username" element={<TeacherInfo/>} />
        <Route path="/class/:classYear" element={<ClassInfo/>} />
        <Route path="/class/searchClass" element={<SearchClass/>} />
        <Route path="/class/addClass" element={<AddNewClass/>} />
        <Route path="/class/section" element = {<SectionInfo/>} />
        <Route path="/attendance/student" element={<MarkStudentAttendance/>} />
        <Route path="/students/view/:rollNumber" element={<StudentInfo/>} />

      </Routes>
    );
    return routes;
  };
  
