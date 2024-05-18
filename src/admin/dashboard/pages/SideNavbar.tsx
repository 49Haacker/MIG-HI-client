import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "@/redux/features/logOut/logoutSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/app/store";

const SideNavbar = () => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();

  const links = [
    // Registration
    {
      path: "/admin/registration/customer-registration",
      text: "Бүртгэл",
      image: "/assets/admin/sidenavbar/sideRegistration.svg",
      focusImage: "/assets/admin/sidenavbar/sideRegistrationLight.svg",
    },

    // Insurance contract
    {
      path: "/admin/insurance-contract/list-contracts",
      text: "Даатгалын гэрээ",
      image: "/assets/customer/sidenavbar/sideInsuContract.svg",
      focusImage: "/assets/customer/sidenavbar/sideInsuContractLight.svg",
    },

    // Compensation
    {
      path: "/admin/compensation/compensation-list",
      text: "Нөхөн төлбөр",
      image: "/assets/customer/sidenavbar/sideCompensation.svg",
      focusImage: "/assets/customer/sidenavbar/sideCompensationLight.svg",
    },

    // Profile
    {
      path: "/admin/customer-profile/profile",
      text: "Профайл",
      image: "/assets/customer/sidenavbar/sideProfile.svg",
      focusImage: "/assets/customer/sidenavbar/sideProfileLight.svg",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    const startingPaths = [
      "/admin/registration",
      "/admin/insurance-contract",
      "/admin/compensation",
      "/admin/customer-profile",
    ];

    for (let i = 0; i < startingPaths.length; i++) {
      if (currentPath.startsWith(startingPaths[i])) {
        setActiveLink(i);
        return;
      }
    }

    // const activeIndex = links.findIndex((link) => link.path === currentPath);
    // setActiveLink(activeIndex);

    setActiveLink(null);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <>
      <div className="h-screen bg-[#005F7E] w-[268px] px-4 py-8 flex flex-col justify-between">
        <div>
          {/* top logo */}
          <div>
            <img
              src="/assets/customer/logo/migLogo.svg"
              alt="migLogo"
              className="h-[24px]"
            />
          </div>

          {/* Employee, Insurance contract, Compensation */}
          <div className="mt-20 flex flex-col items-center gap-8">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center gap-2 w-full ${
                  activeLink === index ? "bg-[#1A6F8B] p-2 rounded-md" : "p-2"
                }`}
              >
                <img
                  src={activeLink === index ? link.focusImage : link.image}
                  alt={link.text}
                  className="w-[32px] h-[32px]"
                />

                <p className="text-[16px] leading-[16px] text-[#FFFFFF] font-normal">
                  {link.text}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* logout section */}
        <div className="">
          <Link
            to={"/"}
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <img
              src="/assets/customer/sidenavbar/sideNavLogOut.svg"
              alt="sideNavLogOut"
              className="w-[32px] h-[32px]"
            />
            <p className="text-[16px] leading-[16px] text-[#FFFFFF] font-normal">
              Гарах
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
