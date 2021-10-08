import { React } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './page/home';
import Register from './page/register';
import Login from './page/login';
import Dashboard from './page/dashboard';


function Routers(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                	<Home></Home>
                </Route>   
                <Route path='/register' exact>
                    <Register></Register>
                </Route>
                <Route path='/login' exact>
                    <Login></Login>
                </Route>
                <Route path='/dashboard' exact>
                    <Dashboard></Dashboard>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;