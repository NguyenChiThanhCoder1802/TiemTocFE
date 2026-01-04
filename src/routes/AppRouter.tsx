import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import OtpVerification from '../pages/auth/OtpVerification';
import Unauthorized from '../pages/Unauthorized';
import AdminDashboard from '../pages/admin/AdminDashboard';
import HairSalonService from '../pages/admin/ServiceManager/HairSalonService';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import MainLayout from '../components/layouts/MainLayout';
import ServicesPage from '../pages/customer/ServicesPage';
import HomePage from '../pages/HomePage';
import SecuritySettings from '../pages/auth/SecuritySettings';
import HomeStaff from '../pages/staff/HomeStaff';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import ServiceDetailPage from '../pages/DetailPage/ServiceDetailPage';
import Account from '../pages/admin/AccountManager/Account';
import CustomerLayout from '../layouts/CustomerLayout';
import ProfilePage from '../pages/customer/Profile/ProfilePage';
import BookingPage from '../pages/customer/Booking/BookingPage';
import DiscountManager from '../pages/admin/DiscountManager/DiscountManager';

const AppRouter = () => {
  return (
    <Routes>
      {/* Không có Header/Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Admin */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/ServiceManager/HairSalonService" element={<HairSalonService />} />
          <Route path="/admin/AccountManager/Accounts" element={<Account />} />
          <Route path="/admin/DiscountManager" element={<DiscountManager />} />
        </Route>
      </Route>
      {/* Có Header/Footer */}
      <Route element={<MainLayout />}>
        {/* public */}
        {/* <Route path="/booking/:id" element={<BookingDetail />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/services/:id" element={<ServiceDetail />} /> */}
        {/* <Route path="/product" element={<ProductPage />} /> */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        {/* <Route path="/orderdetail" element={<OrderDetailPage />} />
        <Route path="/applydiscount" element={<ApplyDiscount />} />
        <Route path="/combos" element={<ComboListPage />} />
        <Route path="/combos/:id" element={<ComboDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/change-password" element={<SecuritySettings />} />

        {/* Customer */}
        <Route element={<PrivateRoute allowedRoles={['customer']} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer/profile" element={<ProfilePage />} />
          <Route path="/customer/home" element={<HomePage />} />
          <Route path="/customer/booking" element={<BookingPage />} />
        </Route>
         
        </Route>
        <Route element={<PrivateRoute allowedRoles={['staff']} />}>
          <Route path="/staff/home" element={<HomeStaff />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
