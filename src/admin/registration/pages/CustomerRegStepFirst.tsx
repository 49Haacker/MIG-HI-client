import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import axios from "@/axios";

const CustomerRegStepFirst = () => {
  const [isChecked, setIsChecked] = useState(true);
  const civilCodeRef = useRef<HTMLInputElement>(null);
  const identityCardRef = useRef<HTMLInputElement>(null);
  const vehicleCertificateRef = useRef<HTMLInputElement>(null);
  const drivingFrontRef = useRef<HTMLInputElement>(null);
  const drivingBackRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    civilCode: File | null;
    identityCard: File | null;
    vehicleCertificate: File | null;
    drivingFront: File | null;
    drivingBack: File | null;
  }>({
    civilCode: null,
    identityCard: null,
    vehicleCertificate: null,
    drivingFront: null,
    drivingBack: null,
  });

  const [inputValues, setInputValues] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    identityNumber: "",
  });

  const handleInputChange = (value: string, fieldName: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleImageClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
    console.log(isChecked);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageKey: keyof typeof formData
  ) => {
    const file = event.target.files?.[0];
    // console.log(file);

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [imageKey]: file,
      }));
    }
  };

  const handleCreateCustomer = () => {
    const data = new FormData();

    // Map frontend input keys to backend keys
    const inputKeyMap: Record<string, string> = {
      lastName: "LastName",
      firstName: "FirstName",
      phoneNumber: "PhoneNo",
      identityNumber: "RegisterNo",
      isChecked: "IsForigner",
    };

    // Append mapped input values to FormData
    Object.entries(inputValues).forEach(([key, value]) => {
      const backendKey = inputKeyMap[key];
      if (backendKey) {
        data.append(backendKey, value);
      }
    });

    // Append the value of the checkbox
    data.append("IsForigner", isChecked ? "0" : "1");

    // Map frontend image keys to backend keys
    const imageKeyMap: Record<string, string> = {
      civilCode: "CivilWarCertificate",
      identityCard: "IdentitybackCertificate",
      vehicleCertificate: "VehicleCertificate",
      drivingFront: "SteeringWheelCertificate",
      drivingBack: "DrivingLinceseback",
    };

    // Append mapped images to FormData
    Object.entries(formData).forEach(([key, value]) => {
      const backendKey = imageKeyMap[key];
      if (backendKey && value !== null) {
        data.append(backendKey, value);
      }
    });

    axios
      .post("customer-register", data)
      .then((response) => {
        console.log("Success:", response.data);
        // Reset input values to empty after successful submission
        setInputValues({
          lastName: "",
          firstName: "",
          phoneNumber: "",
          identityNumber: "",
        });

        // Reset formData to empty after successful submission
        setFormData({
          civilCode: null,
          identityCard: null,
          vehicleCertificate: null,
          drivingFront: null,
          drivingBack: null,
        });

        setIsChecked(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("form was submited");
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                  Овог
                </Label>
                <Input
                  placeholder="Овог оруулах..."
                  className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                  value={inputValues.lastName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "lastName")
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[17.36px]">
                  Нэр
                </Label>
                <Input
                  placeholder="Нэр оруулах..."
                  className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                  value={inputValues.firstName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "firstName")
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                  Утасны дугаар
                </Label>
                <Input
                  placeholder="Утасны дугаар оруулах..."
                  className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                  value={inputValues.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "phoneNumber")
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <Label
                htmlFor=""
                className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
              >
                Регистрийн дугаар
              </Label>

              <div className="flex flex-col sm:flex-row gap-8 w-full">
                <div className="flex gap-2">
                  {isChecked && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                        >
                          P
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            A
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            Б
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            B
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            Г
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {isChecked && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                        >
                          Д
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            A
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            Б
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            B
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                            Г
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  <div className="flex">
                    <Input
                      placeholder="Дугаар"
                      className="text-[#B3CFD8] font-medium text-[14px] leading-[14px] placeholder:text-[#B3CFD8]"
                      value={inputValues.identityNumber}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "identityNumber")
                      }
                    />
                  </div>
                </div>

                <div
                  className="flex items-center space-x-2"
                  onClick={toggleCheckbox}
                >
                  <img
                    src={
                      isChecked
                        ? "/assets/admin/registration/unChecked.svg"
                        : "/assets/admin/registration/checked.svg"
                    }
                    alt={isChecked ? "checked" : "unChecked"}
                    className="cursor-pointer"
                  />

                  <label
                    htmlFor="terms"
                    className="text-[#424B5A] text-[14px] font-medium leading-[17.36px] cursor-pointer"
                  >
                    Гадаадын иргэн эсэх
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Civil Code, Identity Card, photo of vehicle */}
          <div className="w-full flex flex-col gap-2 my-3">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
              {/* Civil Code (front) */}
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm text-[#424B5A]">
                  Иргэний үнэмл (урд тал)
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                  onClick={() => handleImageClick(civilCodeRef)}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="civilCode" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="civilCode"
                      type="file"
                      ref={civilCodeRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "civilCode")}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                  </span>
                </div>
              </div>

              {/* Identity card (back) */}
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm text-[#424B5A]">
                  Иргэний үнэмлэх (ар тал)
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                  onClick={() => handleImageClick(identityCardRef)}
                  style={{ position: "relative" }} // Add position relative to container
                >
                  <label htmlFor="identityCard" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="identityCard"
                      type="file"
                      ref={identityCardRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "identityCard")}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                  </span>
                </div>
              </div>

              {/* Photo of vehicle certificate */}
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm text-[#424B5A]">
                  Тээврийн хэрэгслийн гэрчилгээний зураг
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                  onClick={() => handleImageClick(vehicleCertificateRef)}
                  style={{ position: "relative" }} // Add position relative to container
                >
                  <label
                    htmlFor="vehicleCertificate"
                    className="cursor-pointer"
                  >
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="vehicleCertificate"
                      type="file"
                      ref={vehicleCertificateRef}
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleFileChange(e, "vehicleCertificate")
                      }
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
              {/* Driving license photo (front side) */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#424B5A]">
                  Жолоооны үнэмлэхний зураг (урд тал)
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                  onClick={() => handleImageClick(drivingFrontRef)}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingFront" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingFront"
                      type="file"
                      ref={drivingFrontRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "drivingFront")}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                  </span>
                </div>
              </div>

              {/* Driving license photo (back) */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#424B5A]">
                  Жолоооны үнэмлэхний зураг (ар тал)
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                  onClick={() => handleImageClick(drivingBackRef)}
                  style={{ position: "relative" }} // Add position relative to container
                >
                  <label htmlFor="drivingBack" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingBack"
                      type="file"
                      ref={drivingBackRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, "drivingBack")}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add button */}
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
            onClick={handleCreateCustomer}
          >
            Нэмэх
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerRegStepFirst;
