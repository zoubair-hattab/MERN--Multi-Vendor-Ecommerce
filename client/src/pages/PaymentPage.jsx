import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Payment from '../components/payment/Payment';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

const PaymentPage = () => {
  return (
    <div>
      <div>
        <Header />
        <CheckoutSteps active={2} />
        <Payment />
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
