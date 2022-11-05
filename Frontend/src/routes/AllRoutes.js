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
import StudentFeeRecord from "../pages/Fee/StudentFeeRecord";
import EditStudent from "../pages/Students/EditStudent";
import AddNewExam from "../pages/Exams/AddNewExam";
import AllExams from "../pages/Exams/AllExams";
import ViewFees from "../pages/Fee/ViewFees";
import AddNewFees from "../pages/Fee/AddNewFees";
import ExamInfo from "../pages/Exams/ExamInfo";
import FeeList from "../pages/Fee/FeeList";
import UploadMarks from "../pages/Exams/UploadMarks";
import NewFeeForClass from "../pages/Fee/NewFeeForClass";
import AddNewFeeForStudent from "../pages/Fee/NewFeeForStudent";
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
        <Route path="/Fee/FeeRecord" element={<StudentFeeRecord/>} />
        <Route path="/students/edit" element ={<EditStudent/>} />  
        <Route path="/exams/add" element ={<AddNewExam/>} />     
        <Route path="/exams/search" element ={<AllExams/>} /> 
        <Route path="/exams/:examId" element ={<ExamInfo/>} />
        <Route path ="/exams/uploadMarks/:examId" element = {<UploadMarks/>} />   
        <Route path ="/Fee/ViewFees" element = {<ViewFees/>} />
        <Route path ="/Fee/AddNewFees" element = {<AddNewFees/>} />
        <Route path = "Fee/FeeList" element = {<FeeList/>} />
        <Route path = "Fee/Add/NewFeeForClass" element = {<NewFeeForClass/>} />
        <Route path = "Fee/Add/NewFeeForStudent"element = {<AddNewFeeForStudent/>} />
        
        </Routes>
    );
    return routes;
  };
  
