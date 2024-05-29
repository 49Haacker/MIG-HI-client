import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from '@/admin/Context/UserData'; 
 

import "@/shared-css/CustomScroller.css";

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
  };

  return (
    <>
      <div className="my-3 mx-6">
        {/* tab on top */}
        <div className="flex items-center gap-2 overflow-x-scroll lg:overflow-hidden w-[16.5em] sm:w-[29.5em] lg:w-full">
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
          {CurrantUserRole === '2' ? (
          <Link
            to="/admin/registration/list"
            onClick={() => handleTabClick("/admin/registration/list")}
            className={`${
              activeTab === "/admin/registration/list" ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {location.pathname === "/admin/registration/list" ? "Жагсаалт" : "Харилцагчийн дэлгэрэнгүй"}
            </h4>
          </Link>
        ) : null}



      
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
