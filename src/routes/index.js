import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppRoutes from './routes';
import { NavBar, Footer } from '../components';

const Page = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Component {...props}/>
    )}/>
);

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    {AppRoutes.map(route => (
                        <Page {...route} />
                    ))}
                    <Redirect from="*" to="/not-found" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;