import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "@/axios";
import { useDispatch } from "react-redux";
import { adminCustomerLogin } from "@/redux/features/login/loginSlice";
import { UnknownAction } from "@reduxjs/toolkit";

interface ResponseData {
  data: {
    phoneNo: string;
    otp: string;
    // other properties if any
  };
}

const Sign_In = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  localStorage.removeItem("phNo");

  const handleLogin = async () => {
    if (!number) {
      setError("Please enter a valid phone number.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const action = await dispatch(
        adminCustomerLogin(number) as unknown as UnknownAction
      );
      const responseData = action.payload as ResponseData;

      // const storeOtp = responseData.data.otp;
      // localStorage.setItem("otp", storeOtp);
      
      localStorage.setItem("phNo", responseData.data.phoneNo);
      const res_number = responseData.data.phoneNo;

      navigate("/admin/verify-otp", { state: { phoneNumber: res_number } });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setError("An unknown error occurred");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
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
              placeholder="+(976) 0000-0000"
              className="placeholder:text-[#B3CFD8] text-[#424B5A] font-normal text-[14px] leading-[17.36px]"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex items-center w-full mt-4">
            <Button
              onClick={handleLogin}
              className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#006F8F] font-bold text-[16px] leading-[20.03px] w-full text-center"
            >
              Үргэлжлүүлэх
              {/* Continue */}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
