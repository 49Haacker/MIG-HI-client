import axios from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileSaveData from "@/customer/model/ProfileSaveData";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
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

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      // formData.append("FirstName", customerData?.FirstName || "");
      // formData.append("LastName", customerData?.LastName || "");
      formData.append("PhoneNo", customerData?.PhoneNo || "");

      // Append individual image files to the formData
      formData.append("CivilWarCertificate", imageFiles.identityFront || "");
      formData.append("IdentitybackCertificate", imageFiles.identityBack || "");
      formData.append(
        "SteeringWheelCertificate",
        imageFiles.drivingFront || ""
      );
      formData.append("DrivingLinceseback", imageFiles.drivingBack || "");
      formData.append(
        "VehicleCertificate",
        imageFiles.vehicleCertificate || ""
      );

      const response = await axios.post("customers-edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {customerData && (
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-8 w-full">
            <div className="flex flex-col w-full">
              {/* This */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Овог
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                Цогтбаатар
                {/* License */}
              </Button>
            </div>

            <div className="flex flex-col w-full">
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

            <div className="flex flex-col w-full">
              {/* Register number */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Регистрийн дугаар
              </h1>
              <div className="flex gap-4 w-full">
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                  {/* A */}
                  {customerData.RegisterNo.slice(0, 1)}
                </Button>
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                  {/* A */}
                  {customerData.RegisterNo.slice(1, 2)}
                </Button>
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start w-full">
                  {/* 12345678 */}
                  {customerData.RegisterNo.slice(2)}
                </Button>
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
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Иргэний үнэмлэх (урд тал)
                </h1>
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-auto overflow-hidden">
                  <div className="relative flex justify-center items-center">
                    <img
                      src={
                        imageFiles.identityFront
                          ? URL.createObjectURL(imageFiles.identityFront)
                          : customerData?.CivilWarCertificate ||
                            "/assets/customer/profile/identityFront.svg"
                      }
                      alt="identityFront"
                      className="overflow-hidden"
                    />

                    <input
                      id="civilCertificateFrontInput"
                      type="file"
                      accept="image/*"
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
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Иргэний үнэмлэх (ар тал)
                </h1>
                <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="relative flex justify-center items-center">
                    <img
                      src={
                        imageFiles.identityBack
                          ? URL.createObjectURL(imageFiles.identityBack)
                          : customerData?.IdentitybackCertificate ||
                            "/assets/customer/profile/identityBack.svg"
                      }
                      alt="identityFront"
                    />

                    <input
                      id="civilCertificateBackInput"
                      type="file"
                      accept="image/*"
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
                          ? URL.createObjectURL(imageFiles.drivingFront)
                          : customerData?.SteeringWheelCertificate ||
                            "/assets/customer/profile/drivingFront.svg"
                      }
                      // src={
                      //   customerData.SteeringWheelCertificate
                      //     ? customerData.SteeringWheelCertificate
                      //     : "/assets/customer/profile/drivingFront.svg"
                      // }
                      alt="identityFront"
                    />

                    <input
                      id="drivingFrontInput"
                      type="file"
                      accept="image/*"
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
                      src={
                        imageFiles.drivingBack
                          ? URL.createObjectURL(imageFiles.drivingBack)
                          : customerData?.DrivingLinceseback ||
                            "/assets/customer/profile/drivingBack.svg"
                      }
                      alt="identityFront"
                    />

                    <input
                      id="drivingBackInput"
                      type="file"
                      accept="image/*"
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
                      src={
                        imageFiles.vehicleCertificate
                          ? URL.createObjectURL(imageFiles.vehicleCertificate)
                          : customerData?.VehicleCertificate ||
                            "/assets/customer/profile/vehicleCerti.svg"
                      }
                      // src={
                      //   customerData.VehicleCertificate
                      //     ? customerData.VehicleCertificate
                      //     : "/assets/customer/profile/vehicleCerti.svg"
                      // }
                      alt="identityFront"
                    />

                    <input
                      id="vehicleInput"
                      type="file"
                      accept="image/*"
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

              {/* Excel data entry */}
              <div className="flex flex-col gap-2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                  Excel мэдээлэл оруулах
                </h1>
                <div className="flex items-center justify-center relative bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src="/assets/customer/profile/excelDataEntry.svg"
                      alt="excelDataEntry"
                    />

                    <h1>excel.xlsx</h1>
                  </div>
                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
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
              {/* Save */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
