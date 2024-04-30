import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/admin/auth/AuthLayout";
import { Sign_In, Sign_Up, VerifyOtp } from "@/admin/auth/forms";

import DashboardLayout from "@/admin/dashboard/DashboardLayout";

import RegistrationLayout from "@/admin/registration/RegistrationLayout";
import {
  AdminCustomerDetails,
  CustomerRegistration,
  EmployeeRegistration,
  List,
  ManagerDetails,
} from "@/admin/registration/pages";

import InsuranceContract from "@/admin/Insurance/InsuranceContractLayout";
import { ContractDetails, ListContracts } from "@/admin/Insurance/pages";

import CompensationLayout from "@/admin/Compensation/CompensationLayout";
import {
  ReimbursementDetails,
  CompensationList,
} from "@/admin/Compensation/pages";

import ProfileLayout from "@/admin/Profile/ProfileLayout";
import { Profile } from "@/admin/Profile/pages";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        {/* public routes */}

        <Route path="/admin" element={<AuthLayout />}>
          <Route index element={<Sign_In />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="sign-up" element={<Sign_Up />} />
        </Route>

        {/* private routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          {/* if any go to / then bydefault redirect to the /employee/employee-regestion page */}

          {/* Nested routes for registration */}
          <Route path="/admin/registration" element={<RegistrationLayout />}>
            <Route
              path="customer-registration"
              element={<CustomerRegistration />}
            />
            <Route
              path="employee-registration"
              element={<EmployeeRegistration />}
            />
            <Route path="list" element={<List />} />
            <Route
              path="admin-customer-details"
              element={<AdminCustomerDetails />}
            />
            <Route path="manager-details" element={<ManagerDetails />} />
          </Route>

          {/* Nested routes for insurance */}
          <Route
            path="/admin/insurance-contract"
            element={<InsuranceContract />}
          >
            <Route path="list-contracts" element={<ListContracts />} />
            <Route path="contract-details" element={<ContractDetails />} />
          </Route>

          {/* Nested routes for compensation */}
          <Route path="/admin/compensation" element={<CompensationLayout />}>
            <Route path="compensation-list" element={<CompensationList />} />
            <Route
              path="reimbursement-details"
              element={<ReimbursementDetails />}
            />
          </Route>

          {/* Nested routes for Profile */}
          <Route path="/admin/customer-profile" element={<ProfileLayout />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
