import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnknownAction } from "@reduxjs/toolkit";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import axios from '@/axios'

import {
  verifyOtp,
  VerifyOtpResponse,
} from "@/redux/features/otpVerify/otpVerifySlice";
// import { any, number } from "zod";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string | null>("");
  const [loading , setLoading] = useState(false);
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;

  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("otp")) {
      const storeOtp = localStorage.getItem("otp");
      // console.log(storeOtp);
      setCode(storeOtp);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    const sanitizedInput: string = input.replace(/\D/g, "");
    const limitedInput: string = sanitizedInput.slice(0, 6);
    setCode(limitedInput);
  };

  const handleVeifyOtp = async () => {
    if (!code) {
      setError("Please enter the OTP.");

      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      setLoading(true);
      const actions = await dispatch(
        verifyOtp({
          phoneNumber: phoneNumber,
          code: code,
        }) as unknown as UnknownAction
      );

      const responseData = actions.payload as VerifyOtpResponse;

      if(responseData){
      setLoading(false);
      }

      const userType = responseData?.data.userType ? responseData?.data.userType : null;
      // console.log(userType);

      if (responseData?.statusCode === 200) {
        // navigate("/admin/registration/customer-registration");
        localStorage.setItem('user',userType ? userType : '');
        if (userType === "1" || userType === "2") {
          navigate("/admin/registration/customer-registration");
        } else {
          navigate("/insurance-contract/list-contracts");
        }
      } else {
        setError("OTP is Invalid !!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  
  const redeemCode = async (phoneNumber:any) =>{
    setLoading(true);
      axios.post('customer-login', {
        phoneNo:phoneNumber
      }).then((res)=>{

        if(res){
          toast.success("Otp Sent Successfully !");
        }

      }).catch(()=>{
          toast.error("Please Try Again !!");
      }).then(()=>{
        setLoading(false);
      });

  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-[#FFFFFF] rounded-2xl p-4 w-3/4 lg:w-1/2">
        {/* verify */}
        <div className="flex flex-col gap-6">
          <h1 className="text-[#195563] font-bold leading-[30.05px] text-[24px]">
            Нэвтрэх
          </h1>

          <p className="text-[#8CAAB1] font-normal text-[14px] leading-[18.03px]">
            Таны утсанд ирсэн 6 оронтой кодыг оруулна <br className="hidden d-md-block" /> уу!
          </p>
        </div>

        {/* 6 digit code */}
        <div className="flex gap-2 flex-col mt-8">
          <Label className="font-normal text-[#424B5A] text-md">
            6 оронтой код
          </Label>
          <Input
            placeholder="xxxxxx"
            className="placeholder:text-[#B3CFD8] text-[#424B5A] font-normal text-[14px] leading-[17.36px]"
            value={code ?? ""}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Redeem the code */}
        <div className="w-full text-right">
          <span className="text-[#005F7E] font-normal underline underline-offset-2 text-[12px] leading-[14.88px]" onClick={()=>redeemCode(phoneNumber)}>
            Код дахин авах
          </span>
        </div>

        <div className="flex items-center w-full mt-4">
          <Button
            onClick={handleVeifyOtp}
            className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#006F8F] font-bold text-[16px] leading-[20.03px] w-full text-center"
            disabled={loading}
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
  );
};

export default VerifyOtp;
