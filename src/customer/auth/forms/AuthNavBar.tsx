const AuthNavBar = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white w-full px-12 py-12 max-[499px]:px-4">
        <img
          src="/assets/customer/logo/migDarkLogo.svg"
          alt="migDarkLogo"
          className="w-[250px] h-[48px] max-[499px]:w-[179px] max-[499px]:h-[34px]"
        />
        <img
          src="/assets/customer/logo/flagLogo.svg"
          alt="flagLogo"
          className="w-[48px] h-[24px]"
        />
      </div>
    </>
  );
};

export default AuthNavBar;
