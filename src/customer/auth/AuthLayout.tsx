import { Outlet } from "react-router-dom";
import AuthNavBar from "./forms/AuthNavBar";
import AuthFooter from "./forms/AuthFooter";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [bgStyle, setBgStyle] = useState({});

  const updateBackgroundStyle = () => {
    const isMobile = window.innerWidth <= 768;
    const newStyle = isMobile ? bgImage : bgColor;
    setBgStyle(newStyle);
  };

  useEffect(() => {
    updateBackgroundStyle();
    window.addEventListener("resize", updateBackgroundStyle);
    return () => {
      window.removeEventListener("resize", updateBackgroundStyle);
    };
  }, []);

  const bgImage = {
    backgroundImage:
      "linear-gradient(rgba(0, 95, 126, 0.5), rgba(0, 95, 126, 0.5)), url(/assets/customer/signInAndUp/signInimg.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const bgColor = {
    backgroundColor: "#E6EFF2",
  };

  return (
    <>
      <section className="flex flex-1 min-h-screen items-center flex-col">
        <AuthNavBar />

        <div className="flex flex-1 w-full">
          <div className="hidden md:block w-1/2 relative">
            <div className="absolute inset-0 w-full h-full bg-[#00ACE480] opacity-70 z-10 flex items-center justify-center">
              <p className="text-[#FFFFFF] text-center font-semibold text-3xl">
                МИГ даатгалын эрүүл <br /> мэндийн даатгалын <br /> системд
                тавтай морил
              </p>
            </div>

            <img
              src="/assets/customer/signInAndUp/signInimg.png"
              alt="logo"
              className="object-cover bg-no-repeat absolute inset-0 w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2" style={bgStyle}>
            <Outlet />
          </div>
        </div>

        <AuthFooter />
      </section>
    </>
  );
};

export default AuthLayout;
