import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { logoutUser } from "@/redux/features/logOut/logoutSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/app/store";

const TopNavbarSmall = () => {
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

    {
      path: "/admin",
      text: "Exit",
      image: "/assets/customer/sidenavbar/sideNavLogOut.svg",
      focusImage: "/assets/customer/sidenavbar/sideCompensationLight.svg",
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



  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Get the current user's login number from local storage
    const currentUserPhoneNumber = localStorage.getItem('phNo');
    if (currentUserPhoneNumber) {
      setPhoneNumber(currentUserPhoneNumber);
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full h-[96px] bg-[#005F7E] flex items-center justify-between px-6">
          <div className="flex items-center">
            <img
              src="/assets/customer/user/smallTopNavMigLogo.svg"
              alt="smallTopNavMigLogo"
            />
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/assets/customer/user/topUserSmall.svg"
              alt="topNavBarUser"
              className="w-[26.67px] h-[26.67px]"
            />
            <p className="text-sm text-[#D7D1CB]">{phoneNumber}</p>
          </div>
        </div>

        <div className="w-full flex gap-1 items-center mb-8 bg-white overflow-x-scroll whitespace-nowrap">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={link.text === "Exit" ? handleLogout : undefined}
              className={`flex flex-col items-center gap-2 w-full ${
                activeLink === index ? "bg-[#1A6F8B] p-4" : "bg-[#669FB2] p-4"
              }`}
              style={{ height: "calc(100% - 0px)", width: "calc(100% - 0px)" }}
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
    </>
  );
};

export default TopNavbarSmall;
