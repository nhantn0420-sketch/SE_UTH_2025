import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard pages
import AdminDashboard from './pages/Admin/Dashboard';
import StaffDashboard from './pages/Staff/Dashboard';
import HeadDashboard from './pages/Head/Dashboard';
import LecturerDashboard from './pages/Lecturer/Dashboard';
import LecturerEvaluationList from './pages/Lecturer/EvaluationList';
import StudentDashboard from './pages/Student/Dashboard';
import StudentResources from './pages/Student/Resources';
import StudentChatList from './pages/Student/ChatList';

// User Management
import UserManagement from './pages/Admin/UserManagement';
import SystemReports from './pages/Admin/SystemReports';

// Subject & Class Management
import SubjectManagement from './pages/Staff/SubjectManagement';
import ClassManagement from './pages/Staff/ClassManagement';
import ClassResources from './pages/Classes/ClassResources';
import CurriculumManagement from './pages/Staff/CurriculumManagement';

// Project Management
import ProjectList from './pages/Projects/ProjectList';
import ProjectCreate from './pages/Projects/ProjectCreate';
import ProjectDetail from './pages/Projects/ProjectDetail';
import ProjectApproval from './pages/Head/ProjectApproval';
import ProjectAssignment from './pages/Head/ProjectAssignment';
import ClassList from './pages/Head/ClassList';

// Group Management
import GroupList from './pages/Groups/GroupList';
import GroupDetail from './pages/Groups/GroupDetail';
import GroupWorkspace from './pages/Groups/GroupWorkspace';

// Task Management
import TaskManagement from './pages/Tasks/TaskManagement';

// Contribution Tracking
import ContributionTracking from './pages/Contribution/ContributionTracking';

// Notifications
import NotificationPage from './pages/Notification/NotificationPage';

// Collaboration
import Chat from './pages/Collaboration/Chat';
import VideoCall from './pages/Collaboration/VideoCall';

// AI
import AIChatbot from './pages/AI/AIChatbot';

// Profile
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

// Demo
import FileUploadDemo from './pages/Demo/FileUploadDemo';
import SearchFilterDemo from './pages/Demo/SearchFilterDemo';

// Context
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to appropriate dashboard based on role
  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'staff': return '/staff';
      case 'head': return '/head';
      case 'lecturer': return '/lecturer';
      case 'student': return '/student';
      default: return '/login';
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={getDashboardRoute()} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={getDashboardRoute()} />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={getDashboardRoute()} />} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><SystemReports /></ProtectedRoute>} />

        {/* Staff routes */}
        <Route path="/staff" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />
        <Route path="/staff/subjects" element={<ProtectedRoute allowedRoles={['staff']}><SubjectManagement /></ProtectedRoute>} />
        <Route path="/staff/classes" element={<ProtectedRoute allowedRoles={['staff']}><ClassManagement /></ProtectedRoute>} />
        <Route path="/staff/curricula" element={<ProtectedRoute allowedRoles={['staff']}><CurriculumManagement /></ProtectedRoute>} />

        {/* Head routes */}
        <Route path="/head" element={<ProtectedRoute allowedRoles={['head']}><HeadDashboard /></ProtectedRoute>} />
        <Route path="/head/approvals" element={<ProtectedRoute allowedRoles={['head']}><ProjectApproval /></ProtectedRoute>} />
        <Route path="/head/assignments" element={<ProtectedRoute allowedRoles={['head']}><ProjectAssignment /></ProtectedRoute>} />
        <Route path="/head/classes" element={<ProtectedRoute allowedRoles={['head']}><ClassList /></ProtectedRoute>} />

        {/* Lecturer routes */}
        <Route path="/lecturer" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerDashboard /></ProtectedRoute>} />
        <Route path="/evaluations" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerEvaluationList /></ProtectedRoute>} />

        {/* Student routes */}
        <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute allowedRoles={['student', 'lecturer']}><StudentResources /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute allowedRoles={['student', 'lecturer']}><StudentChatList /></ProtectedRoute>} />

        {/* Shared routes */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/create" element={<ProtectedRoute allowedRoles={['lecturer']}><ProjectCreate /></ProtectedRoute>} />
        <Route path="/projects/:id/edit" element={<ProtectedRoute allowedRoles={['lecturer', 'head']}><ProjectCreate /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProjectDetail />} />

        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/groups/:id/workspace" element={<GroupWorkspace />} />

        <Route path="/classes/:id/resources" element={<ClassResources />} />

        <Route path="/tasks" element={<ProtectedRoute allowedRoles={['lecturer', 'head']}><TaskManagement /></ProtectedRoute>} />
        <Route path="/contributions" element={<ProtectedRoute allowedRoles={['lecturer', 'head']}><ContributionTracking /></ProtectedRoute>} />

        <Route path="/notifications" element={<NotificationPage />} />

        <Route path="/chat/:groupId" element={<Chat />} />
        <Route path="/video/:groupId" element={<VideoCall />} />

        <Route path="/ai-assistant" element={<AIChatbot />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Demo routes (remove in production) */}
        <Route path="/demo/file-upload" element={<FileUploadDemo />} />
        <Route path="/demo/search-filter" element={<SearchFilterDemo />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
