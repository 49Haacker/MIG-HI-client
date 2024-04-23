import { useEffect, useState } from 'react';

const TopNavbar = () => {
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
      <div className="w-full h-[96px] bg-[#FFFFFF] flex items-center justify-end">
        <div className="flex items-center gap-2 px-6">
          <img
            src="/assets/customer/user/topNavBarUser.svg"
            alt="topNavBarUser"
            className="w-[26.67px] h-[26.67px]"
          />
          <p className="text-sm">{phoneNumber}</p>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
