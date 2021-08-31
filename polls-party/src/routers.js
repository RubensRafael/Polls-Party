import { React } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './page/home';


function Routers(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                	<Home></Home>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;