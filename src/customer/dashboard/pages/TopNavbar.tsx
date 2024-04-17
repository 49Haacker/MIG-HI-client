const TopNavbar = () => {
  return (
    <>
      <div className="w-full h-[96px] bg-[#FFFFFF] flex items-center justify-end">
        <div className="flex items-center gap-2 px-6">
          <img
            src="/assets/user/topNavBarUser.svg"
            alt="topNavBarUser"
            className="w-[26.67px] h-[26.67px]"
          />
          <p className="text-sm">9900 8800</p>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
