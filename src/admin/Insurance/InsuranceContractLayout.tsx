import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "@/shared-css/CustomScroller.css";

const InsuranceContract = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const privateRoutes = ["/admin/insurance-contract"];

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
          {/* List of contracts */}
          <Link
            to={
              location.pathname === "/admin/insurance-contract/list-contracts"
                ? "/admin/insurance-contract/list-contracts"
                : "/admin/insurance-contract/contract-details"
            }
            onClick={() =>
              handleTabClick("/admin/insurance-contract/list-contracts")
            }
            className={`${
              activeTab === "/admin/insurance-contract/list-contracts" ||
              activeTab === "/admin/insurance-contract/contract-details"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {/* List of contracts */}
              {location.pathname === "/admin/insurance-contract/list-contracts"
                ? "Гэрээний жагсаалт"
                : "Гэрээний дэлгэрэнгүй"}
              {/* Contract details */}
            </h4>
          </Link>
        </div>

        {/* body div */}
        <div className="flex bg-[#FFFFFF] w-full px-6 py-9 lg:h-[100%] overflow-y-scroll custom-scroller-design">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default InsuranceContract;
