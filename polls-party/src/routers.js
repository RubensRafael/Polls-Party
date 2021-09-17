import { React } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './page/home';
import Register from './page/register';


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
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;