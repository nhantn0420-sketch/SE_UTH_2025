# Giai Đoạn 5: Phát Triển Frontend React

**Thời gian**: 3-4 tuần  
**Mục tiêu**: Xây dựng giao diện người dùng responsive cho 5 vai trò với đầy đủ chức năng

## Nhiệm Vụ Chính

### 5.1. Setup React Project

#### A. Khởi tạo Project

```bash
# Tạo React app
npx create-react-app frontend
cd frontend

# Install dependencies
npm install react-router-dom@6
npm install axios
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install @mui/x-data-grid
npm install socket.io-client
npm install jwt-decode
npm install react-hook-form
npm install recharts  # For charts
npm install date-fns  # Date utilities
npm install react-toastify  # Notifications
npm install @excalidraw/excalidraw  # Whiteboard
npm install react-quill  # Rich text editor
npm install simple-peer  # WebRTC wrapper
```

#### B. Project Structure

```
frontend/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── ProtectedRoute.js
│   │   ├── Admin/
│   │   │   ├── Dashboard.js
│   │   │   ├── UserManagement.js
│   │   │   └── SystemReports.js
│   │   ├── Staff/
│   │   │   ├── Dashboard.js
│   │   │   ├── ImportFiles.js
│   │   │   ├── SubjectManagement.js
│   │   │   └── ClassManagement.js
│   │   ├── DepartmentHead/
│   │   │   ├── Dashboard.js
│   │   │   ├── ProjectApproval.js
│   │   │   └── ProjectAssignment.js
│   │   ├── Lecturer/
│   │   │   ├── Dashboard.js
│   │   │   ├── ProjectCreate.js
│   │   │   ├── GroupManagement.js
│   │   │   ├── ProgressTracking.js
│   │   │   └── Evaluation.js
│   │   ├── Student/
│   │   │   ├── Dashboard.js
│   │   │   ├── GroupWorkspace.js
│   │   │   ├── TaskBoard.js
│   │   │   └── PeerReview.js
│   │   ├── Collaboration/
│   │   │   ├── Chat.js
│   │   │   ├── VideoCall.js
│   │   │   ├── Whiteboard.js
│   │   │   └── TextEditor.js
│   │   └── Shared/
│   │       ├── Notification.js
│   │       ├── FileUpload.js
│   │       └── AIAssistant.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── socket.js
│   │   └── webrtc.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── NotificationContext.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   └── styles/
│       └── theme.js
└── package.json
```

### 5.2. Authentication và Routing

#### A. API Service Setup

**`src/services/api.js`**:
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**`src/services/auth.js`**:
```javascript
import api from './api';
import jwtDecode from 'jwt-decode';

export const authService = {
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return access_token;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  getDecodedToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
```

#### B. Auth Context

**`src/context/AuthContext.js`**:
```javascript
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user on mount
    if (authService.isAuthenticated()) {
      authService.getCurrentUser()
        .then(setUser)
        .catch(() => authService.logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    await authService.login(username, password);
    const userData = await authService.getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### C. Login Component

**`src/components/Auth/Login.js`**:
```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            CollabSphere Login
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              size="large"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
```

#### D. Protected Route

**`src/components/Auth/ProtectedRoute.js`**:
```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
```

#### E. App Router

**`src/App.js`**:
```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Import components
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/Dashboard';
import StaffDashboard from './components/Staff/Dashboard';
import HeadDashboard from './components/DepartmentHead/Dashboard';
import LecturerDashboard from './components/Lecturer/Dashboard';
import StudentDashboard from './components/Student/Dashboard';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/staff/*" element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/head/*" element={
              <ProtectedRoute allowedRoles={['head']}>
                <HeadDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/lecturer/*" element={
              <ProtectedRoute allowedRoles={['lecturer']}>
                <LecturerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/student/*" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

### 5.3. Dashboard Components theo Vai Trò

#### A. Admin Dashboard

**`src/components/Admin/UserManagement.js`**:
```javascript
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import api from '../../services/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await api.patch(`/users/${userId}/deactivate`);
      loadUsers();
    } catch (error) {
      console.error('Failed to deactivate user', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'is_active', headerName: 'Active', width: 100, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeactivate(params.row.id)}
          disabled={!params.row.is_active}
        >
          Deactivate
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        loading={loading}
        checkboxSelection
      />
    </Box>
  );
}

export default UserManagement;
```

#### B. Staff Import Files

**`src/components/Staff/ImportFiles.js`**:
```javascript
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Tab,
  Tabs
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import api from '../../services/api';

function ImportFiles() {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async (endpoint) => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Import Data Files
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Users" />
        <Tab label="Subjects" />
        <Tab label="Classes" />
      </Tabs>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button variant="outlined" component="span" startIcon={<Upload />}>
            Choose File
          </Button>
        </label>
        {file && <Typography variant="body2" sx={{ ml: 2, display: 'inline' }}>
          {file.name}
        </Typography>}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          const endpoints = ['/staff/import-users', '/subjects/import', '/classes/import'];
          handleUpload(endpoints[tab]);
        }}
        disabled={!file}
      >
        Upload
      </Button>
    </Paper>
  );
}

export default ImportFiles;
```

#### C. Lecturer Project Create

**`src/components/Lecturer/ProjectCreate.js`**:
```javascript
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import api from '../../services/api';

function ProjectCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goals: '',
    curriculum: '',
    duration_weeks: 12
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [milestones, setMilestones] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMilestones = async () => {
    setAiLoading(true);
    try {
      const response = await api.post('/ai/generate-milestones', formData);
      setMilestones(response.data.milestones);
    } catch (error) {
      console.error('AI generation failed', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects/', {
        ...formData,
        milestones_json: JSON.stringify(milestones)
      });
      alert('Project created successfully');
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Project
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Goals"
          name="goals"
          fullWidth
          multiline
          rows={2}
          margin="normal"
          value={formData.goals}
          onChange={handleChange}
          required
        />
        <TextField
          label="Curriculum"
          name="curriculum"
          fullWidth
          multiline
          rows={2}
          margin="normal"
          value={formData.curriculum}
          onChange={handleChange}
        />

        <Button
          variant="outlined"
          startIcon={aiLoading ? <CircularProgress size={20} /> : <AutoAwesome />}
          onClick={generateMilestones}
          disabled={aiLoading}
          sx={{ mt: 2, mr: 2 }}
        >
          Generate Milestones with AI
        </Button>

        {milestones.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Generated Milestones:</Typography>
            {milestones.map((m, i) => (
              <Paper key={i} sx={{ p: 2, mt: 1 }}>
                <Typography variant="subtitle1">{m.title}</Typography>
                <Typography variant="body2">{m.description}</Typography>
              </Paper>
            ))}
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Create Project
        </Button>
      </form>
    </Paper>
  );
}

export default ProjectCreate;
```

#### D. Student Task Board

**`src/components/Student/TaskBoard.js`**:
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from '../../services/api';

function TaskBoard({ groupId }) {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  useEffect(() => {
    loadTasks();
  }, [groupId]);

  const loadTasks = async () => {
    // Load tasks from API
    // Implementation here
  };

  const onDragEnd = (result) => {
    // Handle drag and drop
    // Implementation here
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={2}>
        {['todo', 'inProgress', 'done'].map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <Paper
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ flex: 1, p: 2, minHeight: 500 }}
              >
                <Typography variant="h6" gutterBottom>
                  {column === 'todo' ? 'To Do' :
                   column === 'inProgress' ? 'In Progress' : 'Done'}
                </Typography>
                {/* Task cards here */}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
}

export default TaskBoard;
```

## Deliverables Giai Đoạn 5

- [ ] React app structure hoàn chỉnh
- [ ] Authentication flow (login, protected routes)
- [ ] Dashboard cho 5 vai trò
- [ ] User management (Admin)
- [ ] Import files interface (Staff)
- [ ] Project create với AI (Lecturer)
- [ ] Task board (Student)
- [ ] Responsive design
- [ ] API integration hoàn chỉnh

## Next Steps

Chuyển sang `06-CongCuCongTac.md` để implement collaboration tools.
