import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/axios";
import * as React from "react";
import ProfileSaveData from "@/customer/model/ProfileSaveData";
import { ToastContainer, toast } from 'react-toastify';
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

  const parseRegisterNumber = (RegNo: string) => {
    const firstTwoDigits = RegNo.substring(0, 1); // Extracts first two digits
    const middle = RegNo.substring(1, 2); // Extracts first two digits
    const remainingDigits = RegNo.substring(2); // Extracts remaining digits
    return {
      firstTwoDigits,
      middle,
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
 
  const handlePhoneNumberChange = (newPhoneNumber: string) => {
   
      setPhoneNumber(

        newPhoneNumber
    );
  };

  // Fetch profile when the component mounts
  React.useEffect(() => {
    fetchAdminProfile();
  }, []);


  const updateNumber = async ()=>{
    try{
    const formData = new FormData();
    formData.append("PhoneNo", phoneNumber || "");
    const response = await axios.post("admin-edit-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response){
    toast.success("Profile updated successfully");
    }
  }
  catch(error){
    toast.error("Somthing Wrong !!");
  }

  } 

  


  const regNumber = adminProfile?.manager ? parseRegisterNumber(adminProfile.manager.RegisterNumber) : null;

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

              {regNumber?.firstTwoDigits && (
              <button
                className="leading-[14px] flex justify-center items-center bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] py-2 px-4 rounded"
              >
                {regNumber.firstTwoDigits}
              </button>
            )}
          {regNumber?.middle && (
              <button
                className="leading-[14px] flex justify-center items-center bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] py-2 px-4 rounded"
              >
                {regNumber.middle}
              </button>
            )}
            <Button
              className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-center w/full"
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
             // onChange={handlePhoneNumberChange} // Update state on change
              className="w-full" // Additional class for styling
              disabled
            />
            
            <ProfileSaveData
                number={phoneNumber}
                onPhoneNumberChange={handlePhoneNumberChange}
              />
            </div>
           
          </div>
        </div>

        <div className="flex flex-col mt-12">
          <div className="flex justify-end w-full">
            <Button className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
              onClick={updateNumber}
            >
              Хадгалах
            </Button>
            {/* Save */}
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

export default Profile;
