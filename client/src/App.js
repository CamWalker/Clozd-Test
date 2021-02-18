import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Employees from './Employees';
import Employee from './Employee';
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/employees" exact component={Employees} />
        <Route path="/employees/:employeeId" component={Employee} />
        <Redirect to="/employees" />
      </Switch>
    </Router>
  );
}

export default App;
