import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { useRef, useState } from "react";
import axios from "@/axios";

const CustomerRegStepFirst = () => {
  const [isChecked, setIsChecked] = useState(true);
  const civilCodeRef = useRef<HTMLInputElement>(null);
  const identityCardRef = useRef<HTMLInputElement>(null);
  const vehicleCertificateRef = useRef<HTMLInputElement>(null);
  const drivingFrontRef = useRef<HTMLInputElement>(null);
  const drivingBackRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

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

  const [selectedLater1, setSelectedLater1] = useState<string>("");
  const [selectedLater2, setSelectedLater2] = useState<string>("");
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const handleLaterSelect1 = (later: string) => {
    setSelectedLater1(later);
    setIsOpen1(false);
  };
  const handleLaterSelect2 = (later: string) => {
    setSelectedLater2(later);
    setIsOpen2(false);
  };

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
    if (isOpen2) {
      setIsOpen2(false);
    }
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    if (isOpen1) {
      setIsOpen1(false);
    }
  };

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
    // console.log(isChecked);
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
    if (
      !inputValues.lastName ||
      !inputValues.firstName ||
      !inputValues.phoneNumber ||
      !inputValues.identityNumber
    ) {
      setError("Please fill in all required fields.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

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

    // console.log("form was submited");
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
                {/* dropdown and input box */}
                <div className="flex gap-2">
                  {/* first dropdown */}
                  {isChecked && (
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8] shadow-sm bg-white px-4 py-2 text-sm font-medium text-[#B3CFD8] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                          id="options-menu"
                          onClick={toggleDropdown1}
                        >
                          {selectedLater1 ? selectedLater1 : "P"}
                        </button>
                      </div>

                      {isOpen1 && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={() => handleLaterSelect1("A")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              A
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("Б")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Б
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("B")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              B
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("Г")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Г
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* second dropdown */}
                  {isChecked && (
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8] shadow-sm bg-white px-4 py-2 text-sm font-medium text-[#B3CFD8] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                          id="options-menu"
                          onClick={toggleDropdown2}
                        >
                          {selectedLater2 ? selectedLater2 : "Д"}
                        </button>
                      </div>

                      {isOpen2 && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={() => handleLaterSelect2("A")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              A
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("Б")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Б
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("B")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              B
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("Г")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Г
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex w-full">
                    <Input
                      placeholder="Дугаар"
                      className="text-[#424B5A] font-medium text-[14px] leading-[14px] placeholder:text-[#B3CFD8]"
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
        <div className="w-full flex flex-col justify-end">
          {error && (
            <p className="text-red-500 w-full text-right my-4">{error}</p>
          )}

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
      </div>
    </>
  );
};

export default CustomerRegStepFirst;
