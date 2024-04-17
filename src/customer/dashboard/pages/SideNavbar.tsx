import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const location = useLocation();

  const links = [
    // Insurance contract
    {
      path: "/insurance-contract/list-contracts",
      text: "Даатгалын гэрээ",
      image: "/assets/customer/sidenavbar/sideInsuContract.svg",
      focusImage: "/assets/customer/sidenavbar/sideInsuContractLight.svg",
    },

    // Compensation
    {
      path: "/compensation/compensation-materials",
      text: "Нөхөн төлбөр",
      image: "/assets/customer/sidenavbar/sideCompensation.svg",
      focusImage: "/assets/customer/sidenavbar/sideCompensationLight.svg",
    },

    // Profile
    {
      path: "/customer-profile/profile",
      text: "Профайл",
      image: "/assets/customer/sidenavbar/sideProfile.svg",
      focusImage: "/assets/customer/sidenavbar/sideProfileLight.svg",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    const activeIndex = links.findIndex((link) => link.path === currentPath);
    setActiveLink(activeIndex);
  }, [location.pathname]);

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
          <Link to={"/"} className="flex items-center gap-2">
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
