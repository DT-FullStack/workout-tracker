import React from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './views/nav/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Dashboard from 'views/Dashboard';
import AuthProvider from 'views/auth/AuthProvider';
import { AuthGuard } from 'views/auth/AuthGuard';
import GuestOnly from 'views/auth/GuestOnly';
import NotFound from 'views/nav/NotFound';
import ShowWorkout from 'views/workouts/CurrentWorkout';
import "./App.sass"
import "./semantic/semantic.min.css";


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
              <Route path="workout" element={<ShowWorkout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;

// App.propTypes = {
//   // second: PropTypes.
// }

// const mapStateToProps = (state: RootState) => ({
//   authenticated: state.auth.authenticated
// })

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(App)
