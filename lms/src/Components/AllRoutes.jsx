import Login from "../Pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Analytics from "../Pages/Admin/Analytics";
import CourseCreation from "../Pages/Admin/CourseCreation";
import CourseManage from "../Pages/Admin/CourseManage";
import LectureManage from "../Pages/Admin/LectureManage";
import StudenManage from "../Pages/Admin/StudenManage";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedRoutesAdmin from "./ProtectedRoutesAdmin";
import StudentsDashboard from "../Pages/users/Students";
import StudentsProfile from "../Pages/users/StudentsProfile";
export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/admindashboard"
          element={<ProtectedRoutesAdmin component={AdminDashboard} />}
        ></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/coursecreation" element={<CourseCreation />}></Route>
        <Route path="/coursemanagement" element={<CourseManage />}></Route>
        <Route path="/lecturemanagement" element={<LectureManage />}></Route>
        <Route path="/studentsmanagement" element={<StudenManage />}></Route>

        {/* Students Routes */}
        <Route
          path="/students"
          element={<ProtectedRoutes component={StudentsDashboard} />}
        ></Route>
        <Route
          path="/student-profile"
          element={<ProtectedRoutes component={StudentsProfile} />}
        ></Route>
      </Routes>
    </div>
  );
}

