import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { adminCustomerLogin } from "@/redux/features/login/loginSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface ResponseData {
  data: {
    phoneNo: string;
    otp: string;
    userType: string;
    // other properties if any
  };
}

const Sign_In = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  //const [notification, setNotification] = useState<Notification | null>(null);
  localStorage.removeItem("phNo");
  const [error, setError] = useState<string>("");
  const [loading , setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    if (!phoneNumber) {
      toast.error("Please enter a valid phone number.");
      
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      return ;
    }

    try {
      const action = await dispatch(
        adminCustomerLogin(phoneNumber) as unknown as UnknownAction
      );
      const responseData = action.payload as ResponseData;
      if(responseData){
        setLoading(false);
      }
      
      
      localStorage.setItem("phNo", responseData.data.phoneNo);


      // console.log(responseData);

      const res_number = responseData.data.phoneNo;
      // const userType = responseData.data.userType;

      navigate("/verify-otp", { state: { phoneNumber: res_number } });
    } catch (error) {
      setLoading(false);
      toast.error("User was not found ");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-[#FFFFFF] rounded-2xl p-4 w-3/4 lg:w-1/2">
          {/* Login */}
          <h1 className="text-[#195563] leading-[30.05px] font-bold text-[24px]">
            Нэвтрэх
          </h1>

          {/* Phone number */}
          <div className="flex gap-2 flex-col my-12">
            <Label className="font-normal text-[#424B5A] text-[14px] leading-[17.36px]">
              Утасны дугаар
            </Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+(976) 0000-0000"
              className="placeholder:text-[#B3CFD8] text-[#424B5A] font-normal text-[14px] leading-[17.36px]"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}     
          </div>
          {/* {notification && <Notify message={notification.message} type={notification.type} />} */}
          <div className="flex items-center w-full mt-4">
          <Button
            onClick={handleLogin}
            className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#006F8F] font-bold text-[16px] leading-[20.03px] w-full text-center"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={20} color="inherit" /> 
                <Box ml={1}>Ачааллаж байна...</Box> {/* You can add a loading message */}
              </Box>
              ) : (
                'Нэвтрэх'
              )}
          </Button>
          </div>
        </div>
        <ToastContainer
        position="top-right" // Position in the top-right corner
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Show new notifications on top
        closeOnClick // Close on click
        rtl={false} // Right-to-left or left-to-right
        pauseOnFocusLoss // Pause when the window loses focus
        draggable // Allow the toast to be dragged
        pauseOnHover // Pause when hovering over the toast
        />

      </div>
    </>
  );
};

export default Sign_In;
