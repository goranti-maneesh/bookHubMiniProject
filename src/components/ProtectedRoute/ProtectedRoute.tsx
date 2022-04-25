import Cookies from "js-cookie";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";


const ProtectedRoute = (props:RouteProps) => {
    const jwtToken = Cookies.get("jwt_token")
    // console.log(props)
    if(jwtToken === undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute
