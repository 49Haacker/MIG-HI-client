"use client";
import { Outlet } from "react-router-dom";
import { SideNavbar, TopNavbar } from "./pages";
import TopNavbarSmall from "./pages/TopNavbarSmall";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex w-full min-h-screen bg-[#E6EFF2] relative">
        <div className="hidden lg:block sticky top-0 opacity-100 z-50 max-h-screen">
          <SideNavbar />
        </div>

        <div className="w-full flex flex-col flex-1">
          <div className="lg:hidden flex w-full sticky top-0 opacity-100 z-50">
            <TopNavbarSmall />
          </div>

          <div className="hidden lg:flex w-full sticky top-0 opacity-100 z-50">
            <TopNavbar />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
