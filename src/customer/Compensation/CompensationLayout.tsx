import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
  import { HiOutlineMenuAlt3 } from "react-icons/hi";
  import "@/shared-css/CustomScroller.css";
import React from "react";

const CompensationLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();
  const privateRoutes = ["/compensation"];

  const isPrivateRoute = privateRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!localStorage.getItem("token") && isPrivateRoute) {
      navigate("/");
    }
  }, []);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
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
        onClick={toggleMenu}
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
            <div className={` mobile-view-hemburger w-[500px !important] flex items-center gap-2  overflow-x-scroll lg:overflow-hidden  `}>
            {/* Send compensation materials */}
            <Link
            to={"/compensation/compensation-materials"}
            onClick={() =>
              handleTabClick("/compensation/compensation-materials")
            }
            className={`${
              activeTab === "/compensation/compensation-materials"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Нөхөн төлбөрийн матерал илгээх
              {/* Send compensation materials */}
            </h4>
          </Link>

          {/* Reimbursement history */}
          <Link
            to={"/compensation/reimbursement-history"}
            onClick={() =>
              handleTabClick("/compensation/reimbursement-history")
            }
            className={`${
              activeTab === "/compensation/reimbursement-history" ||
              activeTab === "/compensation/reimbursement-details"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {/* Reimbursement history */}
              {location.pathname === "/compensation/reimbursement-history"
                ? "Нөхөн төлбөрийн түүх"
                : "Нөхөн төлбөрийн дэлгэрэнгүй"}
              {/* Reimbursement details */}
            </h4>
          </Link>

        
        </div></>)} </div></>): ("")}

        {/* tab on top */}
          <div className="hidden md:block">
        {/* Send compensation materials, Reimbursement history */}
        <div className="flex items-center gap-2 overflow-x-scroll lg:overflow-hidden w-[16.5em] sm:w-[29.5em] lg:w-full">
          {/* Send compensation materials */}
          <Link
            to={"/compensation/compensation-materials"}
            onClick={() =>
              handleTabClick("/compensation/compensation-materials")
            }
            className={`${
              activeTab === "/compensation/compensation-materials"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Нөхөн төлбөрийн матерал илгээх
              {/* Send compensation materials */}
            </h4>
          </Link>

          {/* Reimbursement history */}
          <Link
            to={"/compensation/reimbursement-history"}
            onClick={() =>
              handleTabClick("/compensation/reimbursement-history")
            }
            className={`${
              activeTab === "/compensation/reimbursement-history" ||
              activeTab === "/compensation/reimbursement-details"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {/* Reimbursement history */}
              {location.pathname === "/compensation/reimbursement-history"
                ? "Нөхөн төлбөрийн түүх"
                : "Нөхөн төлбөрийн дэлгэрэнгүй"}
              {/* Reimbursement details */}
            </h4>
          </Link>
        </div>
        </div>
        {/* body div */}
        <div className="flex bg-[#FFFFFF] px-6 py-9 w-full  overflow-y-scroll custom-scroller-design" style={{ height:'calc(100vh - 158px)' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CompensationLayout;
