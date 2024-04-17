"use client";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/customer/auth/AuthLayout";
import { Sign_In, Sign_Up, VerifyOtp } from "@/customer/auth/forms";

import DashboardLayout from "@/customer/dashboard/DashboardLayout";

import InsuranceContract from "@/customer/Insurance/InsuranceContractLayout";
import { ContractDetails, ListContracts } from "@/customer/Insurance/pages";

import CompensationLayout from "@/customer/Compensation/CompensationLayout";
import {
  CompensationMaterials,
  ReimbursementDetails,
  ReimbursementHistory,
} from "@/customer/Compensation/pages";

import ProfileLayout from "@/customer/Profile/ProfileLayout";
import { Profile } from "@/customer/Profile/pages";

const routes = () => {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Sign_In />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/sign-up" element={<Sign_Up />} />
        </Route>

        {/* private routes */}
        <Route path="/" element={<DashboardLayout />}>
          {/* if any go to / then bydefault redirect to the /employee/employee-regestion page */}

          {/* Nested routes for insurance */}
          <Route path="/insurance-contract" element={<InsuranceContract />}>
            <Route path="list-contracts" element={<ListContracts />} />
            <Route path="contract-details" element={<ContractDetails />} />
          </Route>

          {/* Nested routes for insurance */}
          <Route path="/compensation" element={<CompensationLayout />}>
            <Route
              path="compensation-materials"
              element={<CompensationMaterials />}
            />
            <Route
              path="reimbursement-history"
              element={<ReimbursementHistory />}
            />
            <Route
              path="reimbursement-details"
              element={<ReimbursementDetails />}
            />
          </Route>

          {/* Nested routes for Profile */}
          <Route path="/customer-profile" element={<ProfileLayout />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default routes;
