import React from 'react';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import ResetPassword from './components/auth/ResetPassword';
import UpdateProfile from './components/auth/UpdateProfile';
import Dashboard from './components/drive/Dashboard';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/auth/routes/privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Switch>
                {/* DRIVE */}
                <PrivateRoute path="/" component={ Dashboard } exact />
                <PrivateRoute path="/folder/:folderId" component={ Dashboard } />

                {/* PROFILE */}
                <PrivateRoute path="/profile" component={ Profile } />
                <PrivateRoute path="/update-profile" component={ UpdateProfile } />
                
                {/* AUTH */}
                <Route path="/signup" component={ Signup } />
                <Route path="/login" component={ Login } />
                <Route path="/forgot-password" component={ ResetPassword } />
            </Switch>
        </Router>
    );
}

export default App;
