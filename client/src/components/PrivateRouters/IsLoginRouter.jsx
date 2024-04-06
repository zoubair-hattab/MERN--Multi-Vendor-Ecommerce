import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const IsLoginRouter = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default IsLoginRouter;
