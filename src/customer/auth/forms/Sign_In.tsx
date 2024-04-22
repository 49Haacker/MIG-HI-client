import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminCustomerLogin } from "@/redux/features/login/loginSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ResponseData {
  data: {
    phoneNo: string;
    // other properties if any
  };
}

const Sign_In = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      const action = await dispatch(
        adminCustomerLogin(phoneNumber) as unknown as UnknownAction
      );
      const responseData = action.payload as ResponseData;

      const res_number = responseData.data.phoneNo;

      navigate("/verify-otp", { state: { phoneNumber: res_number } });
    } catch (error) {
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

          <div className="flex items-center w-full mt-4">
            <Button
              onClick={handleLogin}
              className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#006F8F] font-bold text-[16px] leading-[20.03px] w-full text-center"
            >
              Нэвтрэх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
