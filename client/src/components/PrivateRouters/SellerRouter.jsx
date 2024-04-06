import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SellerRouter = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  return currentSeller ? <Outlet /> : <Navigate to="/shop/sign-in" />;
};

export default SellerRouter;
