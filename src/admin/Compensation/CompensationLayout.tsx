import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "@/shared-css/CustomScroller.css";

const CompensationLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const privateRoutes = ["/admin/compensation"];

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
        {/* Send compensation materials, Reimbursement history */}
        <div className="flex items-center gap-2 overflow-x-scroll lg:overflow-hidden w-[16.5em] sm:w-[29.5em] lg:w-full">
          {/* Reimbursement history */}
          <Link
            to={"/admin/compensation/compensation-list"}
            onClick={() =>
              handleTabClick("/admin/compensation/compensation-list")
            }
            className={`${
              activeTab === "/admin/compensation/compensation-list" ||
              activeTab === "/admin/compensation/reimbursement-details"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3 min-w-max lg:min-w-0`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              {/* Reimbursement history */}
              {location.pathname === "/admin/compensation/compensation-list"
                ? "Нөхөн төлбөрийн түүх"
                : "Нөхөн төлбөрийн дэлгэрэнгүй"}
              {/* Reimbursement details */}
            </h4>
          </Link>
        </div>

        {/* body div */}
        <div className="flex bg-[#FFFFFF] px-6 py-9 w-full lg:h-[100%] overflow-y-scroll custom-scroller-design">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CompensationLayout;
