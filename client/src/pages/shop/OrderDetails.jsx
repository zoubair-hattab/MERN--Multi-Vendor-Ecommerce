import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopOrderDetails from '../../components/shop/ShopOrderDetails';
const OrderDetails = () => {
  return (
    <div>
      <div>
        <Header />
        <ShopOrderDetails />
        <Footer />
      </div>
    </div>
  );
};

export default OrderDetails;
