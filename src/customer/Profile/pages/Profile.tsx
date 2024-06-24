import axios from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileSaveData from "@/customer/model/ProfileSaveData";
import { useEffect, useState } from "react";
import FullPageLoader from '@/components/ui/FullPageLoader';
import { FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pdfIcon from '@/assets/eclaim/pdf.png';
import wordIcon from '@/assets/eclaim/word.png';
interface CustomerData {
  id: number;
  FirstName: string;
  LastName: string;
  RegisterNo: string;
  PhoneNo: string;
  IsForigner: boolean | null;
  CivilWarCertificate: string | null;
  IdentitybackCertificate: string | null;
  VehicleCertificate: string | null;
  SteeringWheelCertificate: string | null;
  DrivingLinceseback: string | null;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({
    identityFront: null,
    identityBack: null,
    drivingFront: null,
    drivingBack: null,
    vehicleCertificate: null,
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get("current-customer");
        const customerData = response.data.customer as CustomerData;

        // console.log(customerData);

        setCustomerData(customerData);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "An error occurred");
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, []);

  if (loading) {
    return  <FullPageLoader isLoading={loading} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleImageChange = (file: File | null, type: string) => {
    setImageFiles({ ...imageFiles, [type]: file });
  };

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    if (customerData) {
      setCustomerData({
        ...customerData,
        PhoneNo: newPhoneNumber,
      });
    }
  };

  const getPreviewImg = (file: File | null) => {
    if (file) {
      const fileType = file.type;

      if (fileType.startsWith("image/")) {
        return URL.createObjectURL(file);
      } else if (fileType === "application/pdf") {
        return pdfIcon; // Assuming pdfIcon is a valid URL or imported image
      } else if (
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return wordIcon; // Assuming wordIcon is a valid URL or imported image
      } else {
        return null; // Return null for unsupported file types
      }
    }

    return null; // Return null if file is null or undefined
  };

  const getFileIconOrUrl = (url: string | undefined | null): string => {
    if (!url) {
      return "/assets/customer/employee/uploadIconSm.svg"; // Default icon if URL is undefined or null
    }
  
    const lowerCaseUrl = url.toLowerCase();
    
    if (lowerCaseUrl.endsWith('.pdf')) {
      return pdfIcon // Replace with actual path to your PDF icon
    } else if (lowerCaseUrl.endsWith('.doc') || lowerCaseUrl.endsWith('.docx')) {
      return wordIcon; // Replace with actual path to your Word document icon
    } else if (lowerCaseUrl.endsWith('.jpg') || lowerCaseUrl.endsWith('.jpeg') || lowerCaseUrl.endsWith('.png') || lowerCaseUrl.endsWith('.gif')) {
      return url; // Return the image URL directly
    }
  
    return "/assets/customer/employee/uploadIconSm.svg"; // Default icon if file type is not recognized
  };
  

  const handleEditProfile = async () => {
    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append("PhoneNo", customerData?.PhoneNo || "");
  
      // Append individual image files to the formData
      formData.append("CivilWarCertificate", imageFiles.identityFront || "");
      formData.append("IdentitybackCertificate", imageFiles.identityBack || "");
      formData.append("SteeringWheelCertificate", imageFiles.drivingFront || "");
      formData.append("DrivingLinceseback", imageFiles.drivingBack || "");
      formData.append("VehicleCertificate", imageFiles.vehicleCertificate || "");
  
      const response = await axios.post("customers-edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
  
     
        toast.success("Profile updated successfully");
    
  
      console.log("Profile updated successfully", response);
    } catch (Error) {
      console.error("Error updating profile:", error);
      // if (error.response && error.response.data && error.response.data.message) {
      //   toast.error(error.response.data.message);
      // } else {
        toast.error("Something went wrong!");
      // }
    }
  };
  

  return (
    <>
    
      {customerData && (
        
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-8 w-full">
            <div className="flex flex-col gap-2 w-full">
              
              {/* This */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Овог
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
              {customerData.LastName}
                {/* License */}
              </Button>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {/* Name */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Нэр
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                {/* Энхжавхлан */}
                {customerData.FirstName}
                {/* Enkhjavkhlan */}
              </Button>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {/* Register number */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Регистрийн дугаар
              </h1>
              <div className="flex gap-4 w-full">

              
              {customerData.IsForigner !== null && customerData.IsForigner == false  ? (
                <>
                  <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                    {customerData.RegisterNo.slice(0, 1)}
                  </Button>
                  <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                    {customerData.RegisterNo.slice(1, 2)}
                  </Button>
                  <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start w-fit px-5">
                    {customerData.RegisterNo.slice(2)}
                  </Button>
                </>
              ) : (
                <>
                  <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                    {customerData.RegisterNo}
                  </Button>
                </>
              )}

         
          

              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 relative">
            {/* Phone number */}
            <Label>Утасны дугаар</Label>
            <div className="relative flex">
              <Input
                placeholder="99990000"
                className="w-full absolute"
                value={customerData.PhoneNo}
                disabled
              />

              <ProfileSaveData
                number={customerData.PhoneNo}
                onPhoneNumberChange={handlePhoneNumberChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <div className="flex flex-wrap gap-4">
              {/* Identity card (front side) */}
              <div className="flex flex-col relative gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Иргэний үнэмлэх (урд тал)
               
                  {imageFiles.identityFront ? (
                    <button className="absolute top-1 z-[9999] right-[10px]"
                      onClick={() => {
                        setImageFiles((prevData) => ({
                          ...prevData,
                          identityFront: null,
                        }));
                      }}

                    > <FaTrashAlt style={{ color: 'red' }} /></button>
                  ) : ("")}
                </h1>
            
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[138px] overflow-hidden">
                  <div className="relative flex justify-center items-center">
                    <img
                      src={
                        imageFiles.identityFront
                          ? getPreviewImg(imageFiles.identityFront) || undefined
                          : ( getFileIconOrUrl(customerData?.CivilWarCertificate) || "/assets/customer/employee/uploadIconSm.svg")
                      }
                      onClick={() => !imageFiles.identityFront && document.getElementById('civilCertificateFrontInput')?.click()} 
                      alt="identityFront"
                        className="overflow-hidden h-[120px]"
                    />

                    <input
                      id="civilCertificateFrontInput"
                      type="file"
                      accept="*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(
                          e.target.files?.[0] || null,
                          "identityFront"
                        )
                      }
                    />
                <img
                      src="/assets/customer/profile/editIcon.svg"
                      alt="Edit"
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        document
                          .getElementById("civilCertificateFrontInput")
                          ?.click()
                      }
                    />
                    
                  </div>
                </div>
              </div>

              {/* Identity card (back) */}
              <div className="flex relative flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Иргэний үнэмлэх (ар тал)
                </h1>
                {imageFiles.identityBack ? (
                    <button className="absolute top-1 z-[9999] right-[10px]"
                      onClick={() => {
                        setImageFiles((prevData) => ({
                          ...prevData,
                          identityBack: null,
                        }));
                      }}

                    > <FaTrashAlt style={{ color: 'red' }} /></button>
                  ) : (
                    ""

                  )}
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="relative flex justify-center items-center">
                    <img              
                      src={
                        imageFiles.identityBack
                          ? getPreviewImg(imageFiles.identityBack) || undefined
                          : (getFileIconOrUrl(customerData?.IdentitybackCertificate) || "/assets/customer/employee/uploadIconSm.svg")
                      }
                      onClick={() => !imageFiles.identityBack && document.getElementById('civilCertificateBackInput')?.click()}

                      alt="identityFront"
                      className="overflow-hidden h-[120px]"

                    />

                    <input
                      id="civilCertificateBackInput"
                      type="file"
                      
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(
                          e.target.files?.[0] || null,
                          "identityBack"
                        )
                      }
                    />
                   <img
                      src="/assets/customer/profile/editIcon.svg"
                      alt="Edit"
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        document
                          .getElementById("civilCertificateBackInput")
                          ?.click()
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Driving license (front side) */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Жолоооны үнэмлэх (урд тал)
                </h1>
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="relative flex justify-center items-center">
                    <img
                      src={
                        imageFiles.drivingFront
                          ? getPreviewImg(imageFiles.drivingFront) || undefined
                          : (getFileIconOrUrl(customerData?.SteeringWheelCertificate) || "/assets/customer/employee/uploadIconSm.svg")
                      }
                      onClick={() => !imageFiles.drivingFront && document.getElementById('drivingFrontInput')?.click()} 

                     className="overflow-hidden h-[120px]"

                      alt="identityFront"
                    />

                    <input
                      id="drivingFrontInput"
                      type="file"
                      
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(
                          e.target.files?.[0] || null,
                          "drivingFront"
                        )
                      }
                    />
                   <img
                      src="/assets/customer/profile/editIcon.svg"
                      alt="Edit"
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        document.getElementById("drivingFrontInput")?.click()
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Driving license (back side) */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Жолоооны үнэмлэх (ар тал тал)
                </h1>
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="relative flex justify-center items-center">
                    <img
                      // src={
                      //   imageFiles.drivingBack
                      //     ? URL.createObjectURL(imageFiles.drivingBack)
                      //     : customerData?.DrivingLinceseback ||
                      //       "/assets/customer/employee/uploadIconSm.svg"
                      // }
                      src={
                        imageFiles.drivingBack
                          ? getPreviewImg(imageFiles.drivingBack) || undefined
                          : (getFileIconOrUrl(customerData?.DrivingLinceseback) || "/assets/customer/employee/uploadIconSm.svg")
                      }
                      alt="identityFront"
                      className="overflow-hidden h-[120px]"

                      onClick={() => !imageFiles.drivingBack && document.getElementById('drivingBackInput')?.click()} 
                     

                    />

                    <input
                      id="drivingBackInput"
                      type="file"
                      
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(
                          e.target.files?.[0] || null,
                          "drivingBack"
                        )
                      }
                    />
                     <img
                      src="/assets/customer/profile/editIcon.svg"
                      alt="Edit"
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        document.getElementById("drivingBackInput")?.click()
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Vehicle certificate */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Тээврийн хэрэгслийн гэрчилгээ
                </h1>
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="relative flex justify-center items-center">
                    <img
                      // src={
                      //   imageFiles.vehicleCertificate
                      //     ? URL.createObjectURL(imageFiles.vehicleCertificate)
                      //     : customerData?.VehicleCertificate ||
                      //       "/assets/customer/employee/uploadIconSm.svg"
                            
                      // }
                      src={
                        imageFiles.vehicleCertificate
                          ? getPreviewImg(imageFiles.vehicleCertificate) || undefined
                          : (getFileIconOrUrl(customerData?.VehicleCertificate) || "/assets/customer/employee/uploadIconSm.svg")
                      }
                      onClick={() => !imageFiles.vehicleCertificate && document.getElementById('vehicleInput')?.click()} 

                     className="overflow-hidden h-[120px]"
                      alt="identityFront"
                     
                    />

                    <input
                      id="vehicleInput"
                      type="file"
                      
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageChange(
                          e.target.files?.[0] || null,
                          "vehicleCertificate"
                        )
                      }
                    />
                      <img
                      src="/assets/customer/profile/editIcon.svg"
                      alt="Edit"
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() =>
                        document.getElementById("vehicleInput")?.click()
                      }
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-end w-full">
              <Button
                className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
                onClick={handleEditProfile}
              >
                Хадгалах
              </Button>
              
            </div>
          </div>
          
        </div>
        
      )
      }
        <ToastContainer
          position="top-right"
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
    </>
  );
};

export default Profile;
