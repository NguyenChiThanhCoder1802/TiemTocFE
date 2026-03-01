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
import ProfilePage from '../pages/customer/Profile/ProfilePage';
import StaffList from '../pages/admin/StaffManager/StaffList';
import StaffDetailPage from '../pages/DetailPage/StaffDetailPage';
import BookingManager from '../pages/admin/BookingManager/BookingManager';
import Category from '../pages/admin/CategoryManager/Category';
import ComboManager from '../pages/admin/ComboManager/Combo';
import ComboServiceDetailPage from '../pages/DetailPage/ComboServiceDetailPage';
import DiscountCardManager from '../pages/admin/DiscountManager/DiscountCardManager';
import DiscountListPage from '../components/discount/DiscountList';
import BookingHistory from '../pages/customer/Booking/BookingHistory';
import BookingDetailPage from '../pages/DetailPage/BookingDetailPage';
import FavoriteServicesPage from '../pages/customer/Profile/FavoriteServicesPage';
import PaymentResultPage from '../components/payment/PaymentResultPage';
import BookingSuccessPage from '../components/booking/BookingSuccessPage';
import PaymentHistory from '../pages/customer/Payment/PaymentHistory';
import BookingCreatePage from '../pages/customer/Booking/BookingCreatePage';



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
          <Route path="/admin/ComboManager/Combo" element={<ComboManager />} />
          <Route path="/admin/DiscountManager" element={<DiscountCardManager />} />
          <Route path="/admin/AccountManager/Accounts" element={<Account />} />
          <Route path="/admin/StaffManager/StaffList" element={<StaffList />} />
          <Route path="/admin/BookingManager" element={<BookingManager />} />
          <Route path="/admin/CategoryManager" element={<Category />} />
          <Route path="/admin/stats" element={<AdminDashboard />} />
        </Route>
      </Route>
      {/* Có Header/Footer */}
      <Route element={<MainLayout />}>
       
        <Route path="/services" element={<ServicesPage />} />
     
        <Route path="/staffs/:id" element={<StaffDetailPage />} />
        <Route path="/change-password" element={<SecuritySettings />} />
        {/* <Route path="/services/:id" element={<ServiceDetailPage />} /> */}
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        <Route path="/combos/:id" element={<ComboServiceDetailPage />} /> 
        {/* <Route path="/customer/booking" element={<BookingPage />} /> */}
        <Route path="/discounts" element={<DiscountListPage />} />
        {/* <Route path="/customer/booking/:serviceId" element={<BookingForm />} /> */}
        <Route path="/customer/booking" element={<BookingCreatePage />} />
        <Route
          path="/booking-success/:id"
          element={<BookingSuccessPage />}
        />
        <Route path="/customer/BookingHistory" element={<BookingHistory />} />
        <Route path="/bookings/:id" element={<BookingDetailPage />} />
        <Route path="/payment-result" element={<PaymentResultPage />} />
        <Route path="/customer/paymentHistory" element={<PaymentHistory />} />
        {/* Customer */}
        <Route element={<PrivateRoute allowedRoles={['customer']} />}>
          <Route path="/customer/profile" element={<ProfilePage />} />
          <Route path="/customer/home" element={<HomePage />} />
          <Route path="/customer/profile/favorites" element={<FavoriteServicesPage />} />
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
