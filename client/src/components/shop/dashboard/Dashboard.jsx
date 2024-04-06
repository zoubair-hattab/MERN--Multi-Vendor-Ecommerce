import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';
import DashboardProfile from './content/DashboardProfile';
import AllOrders from './content/AllOrders';
import AllProducts from './content/AllProducts';
import CreateProduct from './content/CreateProduct';
import AllEvents from './content/AllEvents';
import CreateEvent from './content/CreateEvent';
import WithdrawMoney from './content/WithdrawMoney';
import ShopInbox from './content/ShopInbox';
import DiscountCodes from './content/DiscountCodes';
import Refunds from './content/Refunds';
import Sittings from './content/Sittings';
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      <Header />
      <div className="flex  gap-6">
        <div className="md:w-56">
          <SideBar />
        </div>
        {tab == 'dashboard' && <DashboardProfile />}
        {tab == 'all-orders' && <AllOrders />}
        {tab == 'all-products' && <AllProducts />}
        {tab == 'create-product' && <CreateProduct />}
        {tab == 'all-events' && <AllEvents />}
        {tab == 'create-event' && <CreateEvent />}
        {tab == 'withdraw-money' && <WithdrawMoney />}
        {tab == 'inbox' && <ShopInbox />}
        {tab == 'discount-codes' && <DiscountCodes />}
        {tab == 'refunds' && <Refunds />}
        {tab == 'sittings' && <Sittings />}
      </div>
    </div>
  );
};

export default Dashboard;
