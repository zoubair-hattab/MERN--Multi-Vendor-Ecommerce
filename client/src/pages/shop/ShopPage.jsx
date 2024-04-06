import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShopInfo from '../../components/shop/profile/ShopInfo';
import ShopData from '../../components/shop/profile/ShopData';

const ShopPage = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  return (
    <div className="flex  justify-between py-8 px-3 gap-10">
      <ShopInfo seller={currentSeller} />
      <ShopData seller={currentSeller} />
    </div>
  );
};

export default ShopPage;
