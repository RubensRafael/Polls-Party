import { React } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './page/home';
import Register from './page/register';
import Login from './page/login';
import Dashboard from './page/dashboard';
import Create from './page/create';
import Poll from './page/poll';


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
                <Route path='/create' exact>
                    <Create></Create>
                </Route>
                <Route path='/poll/:code' exact>
                    <Poll></Poll>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;