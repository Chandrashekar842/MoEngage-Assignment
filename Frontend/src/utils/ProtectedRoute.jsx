import React from 'react';
import { Route, Navigate } from 'react-router-dom'
import { isTokenValid } from './auth'; // Import your utility function

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}>
        render={(props) =>
            isTokenValid() ? (
                <Component {...props} />
            ) : (
                <Navigate to="/login" />
            )
        }
    </Route>
);