import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AuthProvider } from "@/contexts/AuthContext";

import LandingPage from "./pages/LandingPage";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OrganizationCreate from "./pages/organization/OrganizationCreate";
import OrganizationsList from "./pages/organization/OrganizationsList";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Contacts from "./pages/dashboard/Contacts";
import ContactCreate from "./pages/dashboard/ContactCreate";
import ContactDetails from "./pages/dashboard/ContactDetails";
import Deals from "./pages/dashboard/Deals";
import DealCreate from "./pages/dashboard/DealCreate";
import DealDetails from "./pages/dashboard/DealDetails";
import Products from "./pages/dashboard/Products";
import ProductCreate from "./pages/dashboard/ProductCreate";
import ProductDetails from "./pages/dashboard/ProductDetails";
import Amortization from "./pages/dashboard/Amortization";
import Users from "./pages/dashboard/Users";
import Departments from "./pages/dashboard/Departments";
import DepartmentCreate from "./pages/dashboard/DepartmentCreate";
import DepartmentDetails from "./pages/dashboard/DepartmentDetails";
import Teams from "./pages/dashboard/Teams";
import Roles from "./pages/dashboard/Roles";
import RoleDetails from "./pages/dashboard/RoleDetails";
import Subscriptions from "./pages/dashboard/Subscriptions";
import Notifications from "./pages/dashboard/Notifications";
import Profile from "./pages/dashboard/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="crm-theme">
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Organization onboarding */}
                <Route path="/organizations/create" element={<OrganizationCreate />} />
                <Route path="/organizations" element={<OrganizationsList />} />
                
                {/* Dashboard routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="contacts" element={<Contacts />} />
                  <Route path="contacts/create" element={<ContactCreate />} />
                  <Route path="contacts/:id" element={<ContactDetails />} />
                  <Route path="deals" element={<Deals />} />
                  <Route path="deals/create" element={<DealCreate />} />
                  <Route path="deals/:id" element={<DealDetails />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/create" element={<ProductCreate />} />
                  <Route path="products/:id" element={<ProductDetails />} />
                  <Route path="amortization" element={<Amortization />} />
                  <Route path="users" element={<Users />} />
                  <Route path="departments" element={<Departments />} />
                  <Route path="departments/create" element={<DepartmentCreate />} />
                  <Route path="departments/:id" element={<DepartmentDetails />} />
                  <Route path="teams" element={<Teams />} />
                  <Route path="roles" element={<Roles />} />
                  <Route path="roles/:id" element={<RoleDetails />} />
                  <Route path="subscriptions" element={<Subscriptions />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
