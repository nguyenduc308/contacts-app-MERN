import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/header";
import { Grid } from "./components/ui-kits/GridStyled";
import {routes} from './routes'
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import PrivateRoute from "./components/routing/PrivateRoute"
import './App.css'

const showRoutes = () => {
    return routes && routes.map((r,i)=> {
            if(r.private) {
                return(<PrivateRoute key={i} path={r.path} component={r.main} exact={r.exact}/>)
            } else {
                return(<Route key={i} path={r.path} component={r.main} exact={r.exact} />)
            }
        })
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Header />
                            <Grid>
                                <Switch>
                                    {
                                        showRoutes()
                                    }
                                </Switch>
                            </Grid>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
};

export default App;
