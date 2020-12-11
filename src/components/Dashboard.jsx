import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import List from "./List";
import Form from "./Form";
import Main from "./Main";

function Dashboard() {
    return (
        <Router>
            <div className="main-container">
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Main</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/form">Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list">List</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/form">
                        <Form />
                    </Route>
                    <Route path="/list">
                        <List />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Dashboard;