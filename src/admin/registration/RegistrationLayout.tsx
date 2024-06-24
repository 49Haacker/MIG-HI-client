import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from '@/admin/Context/UserData'; 
import { HiOutlineMenuAlt3 } from "react-icons/hi";


import "@/shared-css/CustomScroller.css";
import React from "react";

const RegistrationLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const CurrantUserRole = localStorage.getItem('user');

  const privateRoutes = ["/admin/registration"];

  const isPrivateRoute = privateRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!localStorage.getItem("token") && isPrivateRoute) {
      navigate("/admin");
    }
  }, []);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>  
      <div className=" my-[58px] md:my-3   mx-6 relative">
      <HiOutlineMenuAlt3
        onClick={()=>setIsOpen(!isOpen)}
        className={`  md:hidden  z-[49]  md: text-3xl border mt-[-49px] absolute top-0 right-0 ${isOpen ? 'text-black' : 'text-gray-500'}`}
      />
      {isOpen ? (<>
        <div ref={menuRef} className="menu-container">
      <div className="hamburger-button" onClick={toggleMenu}>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
        <div className="hamburger-icon"></div>
      </div>
      {isOpen && (
        <>
            <div className={` mobile-view-hemburger flex items-center gap-2  overflow-x-scroll lg:overflow-hidden w-[16.5em] sm:w-[29.5em] lg:w-full `}>
          {/* Customer registration */}
          <Link
            to={"/admin/registration/customer-registration"}
            onClick={() =>
              handleTabClick("/admin/registration/customer-registration")
            }
            className={`${
              activeTab === "/admin/registration/customer-registration"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Харилцагчийн бүртгэл
              {/* Customer registration */}
            </h4>
          </Link>

          {/* Employee registration */}
          <Link
            to={"/admin/registration/employee-registration"}
            onClick={() =>
              handleTabClick("/admin/registration/employee-registration")
            }
            className={`${
              activeTab === "/admin/registration/employee-registration"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Ажилтны бүртгэл
              {/* Employee registration */}
            </h4>
          </Link>

          {/* List */}
          {CurrantUserRole ? (
          <Link
            to="/admin/registration/list"
            onClick={() => handleTabClick("/admin/registration/list")}
            className={`${
              activeTab === "/admin/registration/list" ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {location.pathname === "/admin/registration/list" ? "Жагсаалт" : "Жагсаалт"}
            </h4>
          </Link>
        ) : null}</div></>)} </div></>): ("")}

        {/* tab on top */}
          <div className="hidden md:block">
          <div className={`  flex items-center gap-2  overflow-x-scroll lg:overflow-hidden w-[16.5em] sm:w-[29.5em] lg:w-full `}>
          {/* Customer registration */}
          <Link
            to={"/admin/registration/customer-registration"}
            onClick={() =>
              handleTabClick("/admin/registration/customer-registration")
            }
            className={`${
              activeTab === "/admin/registration/customer-registration"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Харилцагчийн бүртгэл
              {/* Customer registration */}
            </h4>
          </Link>

          {/* Employee registration */}
          <Link
            to={"/admin/registration/employee-registration"}
            onClick={() =>
              handleTabClick("/admin/registration/employee-registration")
            }
            className={`${
              activeTab === "/admin/registration/employee-registration"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Ажилтны бүртгэл
              {/* Employee registration */}
            </h4>
          </Link>

          {/* List */}
          {CurrantUserRole  ? (
          <Link
            to="/admin/registration/list"
            onClick={() => handleTabClick("/admin/registration/list")}
            className={`${
              activeTab === "/admin/registration/list" ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {location.pathname === "/admin/registration/list" ? "Жагсаалт" : "Жагсаалт"}
            </h4>
          </Link>
        ) : null}
        </div>
          </div>
        {/* body div */}
        <div className="flex bg-[#FFFFFF]  px-6 py-9 w-full lg:h-[77vh] overflow-y-scroll custom-scroller-design">
          <UserProvider>
          <Outlet />
          </UserProvider>
        </div>
      </div>
    </>
  );
};

export default RegistrationLayout;
