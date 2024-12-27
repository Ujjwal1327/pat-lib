import Layout from './Pages/Layout.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import UserLogin from './Pages/UserLogin.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import Blog from './Pages/Blog.jsx';
import NotFound from './Pages/NotFound.jsx';
import MainPage from './Pages/MainPage.jsx';
import AdminDashboard from './protected/AdminDashboard.jsx';
import ProtectedRoute from './protected/ProtectedRoute.jsx';
import AdminLayout from './AdminLayout.jsx';
import Seat from './protected/Seat.jsx';
import Enquiries from './protected/Enquiries.jsx';
import StudentList from './protected/StudentList.jsx';
import AddStudent from './protected/AddStudent.jsx';
import ManageShifts from './protected/ManageShifts.jsx';
import AddExpense from './protected/AddExpense.jsx';
import ExpenseList from './protected/ExpenseList.jsx';
import StudentDetails from './protected/StudentDetails.jsx';
import ActiveStudents from './protected/ActiveStudents.jsx';
import Left from './protected/Left.jsx';
import PendingStudents from './protected/PendingStudents.jsx';
export const routes = [
    {
        path: "/", // Public layout for home and static pages
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "blog", element: <Blog /> },
            { path: "contact", element: <Contact /> },
            { path: "user", element: <UserLogin /> },
        ],
    },
    {
        path: "/admin/login", // Admin login page (no layout required)
        element: <AdminLogin />,
        errorElement: <NotFound />,
    },
    {
        path: "/admin", // Admin layout with protected route
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>

        ),
        errorElement: <NotFound />,
        children: [
            { path: "", element: <AdminDashboard /> }, // Relative path
            { path: "expenses/overview", element:   <ExpenseList/> }, // Relative path
            { path: "expenses/add", element: <AddExpense/> }, // Relative path
            { path: "income/overview", element: <MainPage data="this is expense overview" /> }, // Relative path
            { path: "students/active", element: <ActiveStudents/> }, // Relative path
            { path: "students/pending", element: <PendingStudents/> }, // Relative path
            { path: "students/left", element: <Left/>}, // Relative path
            { path: "students/all", element: <StudentList/> }, // Relative path
            { path: "students/all/:id", element: <StudentDetails /> }, // Relative path
            { path: "students/add", element: <AddStudent /> }, // Relative path
            { path: "seat", element: <Seat/> }, // Relative path
            { path: "shift", element: <ManageShifts/> }, // Relative path
            { path: "enquiries", element: <Enquiries/> }, // Relative path
            

        ],
    },
];
