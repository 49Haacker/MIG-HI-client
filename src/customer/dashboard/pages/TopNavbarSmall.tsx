import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TopNavbarSmall = () => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const location = useLocation();

  const links = [
    {
      path: "/employee/employee-registration",
      text: "Admin",
      image: "/assets/sidenavbar/sideEmployee.svg",
      focusImage: "/assets/sidenavbar/sideEmployeeLight.svg",
    },
    {
      path: "/insurance-contract/registration-contracts",
      text: "Contact",
      image: "/assets/sidenavbar/sideInsuContract.svg",
      focusImage: "/assets/sidenavbar/sideInsuContractLight.svg",
    },
    {
      path: "/compensation/compensation-materials",
      text: "Claim",
      image: "/assets/sidenavbar/sideCompensation.svg",
      focusImage: "/assets/sidenavbar/sideCompensationLight.svg",
    },
    {
      path: "/",
      text: "Exit",
      image: "/assets/sidenavbar/sideNavLogOut.svg",
      focusImage: "/assets/sidenavbar/sideCompensationLight.svg",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    const activeIndex = links.findIndex((link) => link.path === currentPath);
    setActiveLink(activeIndex);
  }, [location.pathname]);

  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full h-[96px] bg-[#005F7E] flex items-center justify-between px-6">
          <div className="flex items-center">
            <img
              src="/assets/user/smallTopNavMigLogo.svg"
              alt="smallTopNavMigLogo"
            />
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/assets/user/topUserSmall.svg"
              alt="topNavBarUser"
              className="w-[26.67px] h-[26.67px]"
            />
            <p className="text-sm text-[#D7D1CB]">9900 8800</p>
          </div>
        </div>

        <div className="w-full flex gap-1 items-center mb-8 bg-white">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex flex-col items-center gap-2 w-full h-[cal(76px)] ${
                activeLink === index ? "bg-[#1A6F8B] p-4" : "bg-[#669FB2] p-4"
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
    </>
  );
};

export default TopNavbarSmall;
