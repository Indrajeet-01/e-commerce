import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      element={
        <Fragment>
          {loading === false && (
            <>
              {isAuthenticated === false ? (
                <Navigate to="/login" replace />
              ) : isAdmin === true && user.role !== "admin" ? (
                <Navigate to="/login" replace />
              ) : (
                <Component />
              )}
            </>
          )}
        </Fragment>
      }
    />
  );
};

export default ProtectedRoute;
