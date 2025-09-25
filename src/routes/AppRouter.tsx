import { Routes, Route } from 'react-router-dom';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import OtpVerification from '../pages/account/OtpVerification';
import Unauthorized from '../pages/Unauthorized';
import BookingManager from '../pages/admin/BookingManager';
import DiscountManager from '../pages/admin/DiscountManager';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import BookingPage from '../pages/customer/BookingPage';
import ProductPage from '../pages/customer/ProductPage';
import CartPage from '../pages/customer/CartPage';
import ApplyDiscount from '../pages/DiscountPage';
import ForgotPassword from '../pages/account/ForgotPassword';
import ResetPassword from '../pages/account/ResetPassword';
import ServiceManager from '../pages/admin/Service/ServiceManager';
import ProductManager from '../pages/admin/ProductManager';
import UserManager from '../pages/admin/UserManager';
import MainLayout from '../components/layouts/MainLayout';
import OrderDetailPage from '../pages/Detail/OrderDetailPage';
import ServicesPage from '../pages/customer/ServicesPage';
import OrderHistoryPage from '../pages/customer/OrderHistoryPage';
import HomePage from '../pages/HomePage';
import OrderManager from '../pages/admin/OrderManager';
import BookingHistoryPage from '../pages/customer/BookingHistoryPage';
import RevenuePage from '../pages/admin/RevenuePage';
import BookingDetail from '../pages/Detail/BookingDetail';
import ProductDetail from '../pages/Detail/ProductDetail';
import ProfilePage from '../pages/ProfilePage';
import CategoryManager from '../pages/admin/Category';
import ServiceDetail from '../pages/Detail/ServiceDetail';
import BeautyComboPage from '../pages/admin/BeautyCombo';
import CustomerDashBoard from '../pages/customer/CustomerDashBoard';
import SecuritySettings from '../pages/account/SecuritySettings';
import ComboListPage from '../pages/ComboListPage';
import ComboDetailPage from '../pages/Detail/ComboDetailPage';

import HomeStaff from '../pages/staff/HomeStaff';
const AppRouter = () => {
  return (
    <Routes>
      {/* Không có Header/Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Có Header/Footer */}
      <Route element={<MainLayout />}>
        {/* public */}
        <Route path="/booking/:id" element={<BookingDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/orderdetail" element={<OrderDetailPage />} />
        <Route path="/applydiscount" element={<ApplyDiscount />} />
        <Route path="/combos" element={<ComboListPage />} />
        <Route path="/combos/:id" element={<ComboDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
         <Route path="/change-password" element={<SecuritySettings />} />
        {/* Admin */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<BookingManager />} />
          <Route path="/admin/discount" element={<DiscountManager />} />
          <Route path="/admin/services" element={<ServiceManager />} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/revenue" element={<RevenuePage />} />
          <Route path="/admin/orders" element={<OrderManager />} />
          <Route path="/admin/users" element={<UserManager />} />
          <Route path="/admin/categories" element={<CategoryManager />} />
          

          <Route path="/admin/beautycombo" element={<BeautyComboPage />} />
        </Route>
        {/* Customer */}
        <Route element={<PrivateRoute allowedRoles={['Customer']} />}>
          <Route path="/booking" element={<BookingPage />} />
           <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-orders" element={<OrderHistoryPage />} />
          <Route path="/my-booking" element={<BookingHistoryPage />} />
          <Route path="/my-profile" element={<CustomerDashBoard />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['Staff']} />}>
           <Route path="/staff/home" element={<HomeStaff />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
