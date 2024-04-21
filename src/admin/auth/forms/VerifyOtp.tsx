import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");

  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;

  const [error, setError] = useState<string>("");

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
      const response = await axios.post("otp-verify", {
        phoneNo: phoneNumber,
        otp: code,
      });

      // console.log("otp respone", response);

      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.token);

        navigate("/admin/registration/customer-registration");
      } else {
        console.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-[#FFFFFF] rounded-2xl p-4 w-3/4 lg:w-1/2">
        {/* verify */}
        <div className="flex flex-col gap-6">
          <h1 className="text-[#195563] font-bold leading-[30.05px] text-[24px]">
            Нэвтрэх
          </h1>

          <p className="text-[#8CAAB1] font-normal text-[14px] leading-[18.03px]">
            Таны утсанд ирсэн 6 оронтой кодыг оруулна <br /> уу!
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
            value={code}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Redeem the code */}
        <div className="w-full text-right">
          <span className="text-[#005F7E] font-normal underline underline-offset-2 text-[12px] leading-[14.88px]">
            Код дахин авах
          </span>
        </div>

        <div className="flex items-center w-full mt-4">
          <Button
            onClick={handleVeifyOtp}
            className="text-[#FFFFFF] font-bold text-2xl bg-[#005F7E] hover:bg-[#006F8F] w-full"
          >
            Нэвтрэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
