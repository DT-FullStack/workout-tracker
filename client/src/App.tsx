import React from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './components/nav/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from 'components/Dashboard';
import AuthProvider from 'components/auth/AuthProvider';
import AuthGuard from 'components/auth/AuthGuard';
import GuestOnly from 'components/auth/GuestOnly';
import NotFound from 'components/nav/NotFound';
import CurrentWorkout from 'components/workouts/CurrentWorkout';
import "./semantic/semantic.min.css";
// import 'semantic-ui-css/semantic.min.css'
import "./App.sass"
import NewWorkout from 'components/workouts/NewWorkout';


function App() {
  return (
    <AuthProvider>
      <Container id="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<GuestOnly />} >
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="signin" element={<Login />} />
            </Route>
            <Route path="dashboard" element={<AuthGuard />}>
              <Route index element={<Dashboard />} />
              <Route path="workout" element={<CurrentWorkout />} />
              <Route path="workout/new" element={<NewWorkout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;

