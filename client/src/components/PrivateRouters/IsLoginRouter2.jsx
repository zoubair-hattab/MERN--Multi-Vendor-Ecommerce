import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const IsLoginRouter2 = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  return currentSeller ? (
    <Navigate to={`/shop/${currentSeller._id}`} />
  ) : (
    <Outlet />
  );
};

export default IsLoginRouter2;
