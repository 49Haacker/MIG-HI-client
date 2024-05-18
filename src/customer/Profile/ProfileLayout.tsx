import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "@/shared-css/CustomScroller.css";

const ProfileLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const privateRoutes = ["/customer-profile"];

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
          {/* Profile */}
          <Link
            to={"/customer-profile/profile"}
            onClick={() => handleTabClick("/customer-profile/profile")}
            className={`${
              activeTab === "/customer-profile/profile"
                ? "bg-[#FFFFFF]"
                : "bg-[#F9F9F9]"
            } hover:bg-[#FFFFFF] rounded-t-2xl p-3`}
          >
            <h4 className="text-[16px] leading-[16px] text-[#424B5A] font-medium">
              Профайл
            </h4>
          </Link>
          {/* Profile */}
        </div>

        {/* body div */}
        <div className="flex bg-[#FFFFFF]  px-6 py-9 w-full lg:h-[calc(100% - 404px)] overflow-y-scroll custom-scroller-design">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
