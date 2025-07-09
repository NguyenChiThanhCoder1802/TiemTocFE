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
import ServiceManager from '../pages/admin/ServiceManager';
import ProductManager from '../pages/admin/ProductManager';
import UserManager from '../pages/admin/UserManager';
import MainLayout from '../components/layouts/MainLayout';
import OrderDetailPage from '../pages/OrderDetailPage';
import ServicesPage from '../pages/customer/ServicesPage';
import OrderHistoryPage from '../pages/customer/OrderHistoryPage';
import HomePage from '../pages/HomePage';
import OrderManager from '../pages/admin/OrderManager';
import BookingHistoryPage from '../pages/customer/BookingHistoryPage';
import InvoicePreviewPage from '../pages/InvoicePreviewPage';
import RevenuePage from '../pages/admin/RevenuePage';
import BookingDetail from '../pages/BookingDetail';
import ProductDetail from '../pages/ProductDetail';
import ProfilePage from '../pages/ProfilePage';



const AppRouter = () => {
  return (
    <Routes>
      {/* Không có Header/Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/invoice/preview" element={<InvoicePreviewPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Có Header/Footer */}
      <Route element={<MainLayout />}>
        {/* public */}
        <Route path="/booking/:id" element={<BookingDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/orderdetail" element={<OrderDetailPage />} />
        <Route path="/applydiscount" element={<ApplyDiscount />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Admin */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/booking" element={<BookingManager />} />
          <Route path="/admin/discount" element={<DiscountManager />} />
          <Route path="/admin/services" element={<ServiceManager />} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/revenue" element={<RevenuePage />} />
          <Route path="/admin/orders" element={<OrderManager />} />
          <Route path="/admin/users" element={<UserManager />} />
        </Route>

        {/* Customer */}
        <Route element={<PrivateRoute allowedRoles={['Customer']} />}>
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-orders" element={<OrderHistoryPage />} />
          <Route path="/my-booking" element={<BookingHistoryPage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
