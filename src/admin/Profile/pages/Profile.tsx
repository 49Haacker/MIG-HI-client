import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/axios";
import * as React from "react";

interface Manager {
  id: number;
  UserId: number | null;
  LastName: string;
  Name: string;
  RegisterNumber: string;
  PhoneNo: string;
  UserTypeText: string;
  updatedAt: string;
  createdAt: string;
}

interface User {
  id: number;
  phoneNo: string;
  otp: string;
  otpVerifiedAt: string;
  isOtpVerified: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  manager: Manager | null;
  user: User | null;
  status: string;
  statusCode: number;
  message: string;
}

const Profile = () => {
  const [adminProfile, setAdminProfile] = React.useState<ApiResponse | null>(null); // State to store profile data

  const parsePhoneNumber = (phoneNo: string) => {
    const leadingAlphabets = phoneNo.match(/^[A-Za-z]+/); // Extracts leading alphabets
    const remainingDigits = phoneNo.replace(leadingAlphabets?.[0] ?? "", ""); // Removes leading alphabets
    return {
      leadingAlphabets: leadingAlphabets?.[0] || "",
      remainingDigits,
    };
  };

  // Fetch admin profile from the API
  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get("current-admin");
      setAdminProfile(response.data); // Set the state with the fetched data
      setPhoneNumber(response.data.manager.PhoneNo)
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  const [phoneNumber, setPhoneNumber] = React.useState("");

  // Event handler to capture changes in the input field
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value); // Update the state with the new value
  };

  // Fetch profile when the component mounts
  React.useEffect(() => {
    fetchAdminProfile();
  }, []);


  const regNumber = adminProfile?.manager ? parsePhoneNumber(adminProfile.manager.RegisterNumber) : null;

  return (
    <>
      <div className="w-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col sm:flex-row items-start gap-8 w-full">
            <div className="flex flex-col w-full gap-2">
              {/* This */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Овог
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
              {adminProfile?.manager?.LastName || " "}
                {/* License */}
              </Button>
            </div>

            <div className="flex flex-col w-full gap-2">
              {/* Name */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Нэр
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
              {adminProfile?.manager?.Name || " "}

                {/* Enkhjavkhlan */}
              </Button>
            </div>

            <div className="flex flex-col w-full gap-2">
              {/* Register number */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Регистрийн дугаар
              </h1>
              <div className="flex gap-4 w-full">

              {regNumber?.leadingAlphabets.split("").map((letter, index) => (
              <Button
                key={index}
                className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start"
              >
                {letter}
              </Button>
            ))}

            <Button
              className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start w/full"
            >
              {regNumber?.remainingDigits || ""}
            </Button>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 relative">
            {/* Phone number */}
            <Label>Утасны дугаар</Label>
            <div className="relative flex">
            <Input
              type="text" // Input type can be text to allow for flexibility in user input
              placeholder="99990000" // Placeholder text
              value={phoneNumber} // Bind state to the input
              onChange={handlePhoneNumberChange} // Update state on change
              className="w-full" // Additional class for styling
            />

              <img
                src="/assets/customer/profile/editIcon.svg"
                alt="editIcon"
                className="absolute right-2 top-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-12">
          <div className="flex justify-end w-full">
            <Button className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]">
              Хадгалах
            </Button>
            {/* Save */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
