import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InsuranceProvider } from '@/customer/Context/InsuranceData';  
import "@/shared-css/CustomScroller.css";

const InsuranceContract = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const privateRoutes = ["/insurance-contract"];

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

  return (
    <>
      <div className="my-3 mx-6">
        {/* tab on top */}
        <div className="w-full flex items-center gap-2">
          {/* List of contracts */}
          <Link
            to={
              location.pathname === "/insurance-contract/list-contracts"
                ? "/insurance-contract/list-contracts"
                : "/insurance-contract/contract-details"
            }
            onClick={() => handleTabClick("/insurance-contract/list-contracts")}
            className={`${
              activeTab === "/insurance-contract/list-contracts" ||
              activeTab === "/insurance-contract/contract-details"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {/* List of contracts */}
              {location.pathname === "/insurance-contract/list-contracts"
                ? "Гэрээний жагсаалт"
                : "Гэрээний дэлгэрэнгүй"}
              {/* Contract details */}
            </h4>
          </Link>
        </div>

        {/* body div */}
        <div className="flex bg-[#FFFFFF] w-full px-6 py-9 lg:h-[600px] overflow-y-scroll custom-scroller-design">
          <InsuranceProvider>
            <Outlet />
          </InsuranceProvider>
          
        </div>
      </div>
    </>
  );
};

export default InsuranceContract;
