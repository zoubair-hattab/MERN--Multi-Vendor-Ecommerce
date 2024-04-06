import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ActivationPage,
  ActivationShopPage,
  BestSellerPage,
  CheckoutPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  LoginShopPage,
  OrderSuccessPage,
  PaymentPage,
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  RegisterPage,
  RegisterShopPage,
} from './utils/routesPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadShop, loadUser } from './redux/actions/userAction';
import IsLoginRouter from './components/PrivateRouters/IsLoginRouter';
import UserRouter from './components/PrivateRouters/UserRouter';
import IsLoginRouter2 from './components/PrivateRouters/IsLoginRouter2';
import SellerReducer from './redux/reducers/sellerReducer';
import SellerRouter from './components/PrivateRouters/SellerRouter';
import ShopPage from './pages/shop/ShopPage';
import DashboardPage from './pages/shop/DashboardPage';
import { laodProduct } from './redux/actions/productAction';
import { laodEvent } from './redux/actions/eventAction';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadShop());
    dispatch(laodProduct());
    dispatch(laodEvent());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route element={<IsLoginRouter />}>
            <Route path="sign-in" element={<LoginPage />} />
            <Route path="sign-up" element={<RegisterPage />} />
          </Route>
          <Route path="activation/user/:token" element={<ActivationPage />} />
          <Route path="best-selling" element={<BestSellerPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:name" element={<ProductDetailsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route element={<UserRouter />}>
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="order/success/:id" element={<OrderSuccessPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* shop router */}

          <Route element={<IsLoginRouter2 />}>
            <Route path="shop/sign-in" element={<LoginShopPage />} />
            <Route path="shop/sign-up" element={<RegisterShopPage />} />
          </Route>
          <Route element={<SellerRouter />}>
            <Route path="shop/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="shop/:id" element={<ShopPage />} />

          <Route
            path="activation/shop/:token"
            element={<ActivationShopPage />}
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
