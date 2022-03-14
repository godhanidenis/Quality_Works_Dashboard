import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                checkAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: "/"}}/>
                )
            }
        />
    );
};

const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

export default PrivateRoute;
