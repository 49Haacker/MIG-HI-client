import axios from "@/axios";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FormData {
  lastName: string;
  name: string;
  registerNumber: string;
  phoneNumber: string;
}

const EmployeeRegistration = () => {
  const [inputData, setInputData] = useState<FormData>({
    lastName: "",
    name: "",
    registerNumber: "",
    phoneNumber: "",
  });
  const [formValid, setFormValid] = useState<boolean>(true);

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
    setInputData((prevInputData) => ({
      ...prevInputData,
      [fieldName]: value,
    }));
  };

  const handleRegisterManager = async () => {
    if (
      inputData.lastName.trim() === "" ||
      inputData.name.trim() === "" ||
      inputData.registerNumber.trim() === "" ||
      inputData.phoneNumber.trim() === "" ||
      selectedLater1.trim() === "" ||
      selectedLater2.trim() === ""
    ) {
      setFormValid(false);
      setTimeout(() => {
        setFormValid(true);
      }, 2000);
      return;
    }

    const combinedValue = {
      LastName: inputData.lastName,
      Name: inputData.name,
      RegisterNumber:
        selectedLater1 + selectedLater2 + inputData.registerNumber,
      PhoneNo: inputData.phoneNumber,
    };

    try {
      const response = await axios.post("admin", combinedValue);

      console.log(response);

      setInputData({
        lastName: "",
        name: "",
        registerNumber: "",
        phoneNumber: "",
      });
      setSelectedLater1("");
      setSelectedLater2("");
    } catch (error) {
      console.log("Manager regester error: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-start justify-between w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* last name */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                Овог
              </Label>
              <Input
                placeholder="Овог оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                value={inputData.lastName}
                onChange={(e) => handleInputChange(e.target.value, "lastName")}
              />
            </div>

            {/* name */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[17.36px]">
                Нэр
              </Label>
              <Input
                placeholder="Нэр оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                value={inputData.name}
                onChange={(e) => handleInputChange(e.target.value, "name")}
              />
            </div>

            {/* dropdown and input box */}
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor=""
                className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
              >
                Регистрийн дугаар
              </Label>

              <div className="flex gap-8 w-full">
                <div className="flex gap-2">
                  {/* first dropdown */}
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

                  {/* second dropdown */}
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

                  <div className="flex w-full">
                    <Input
                      placeholder="Дугаар"
                      className="text-[#424B5A] font-medium text-[14px] leading-[14px] placeholder:text-[#B3CFD8]"
                      value={inputData.registerNumber}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "registerNumber")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* phone number */}
          <div className="flex flex-col gap-2 w-full sm:w-[33%] mt-4">
            <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
              Утасны дугаар
            </Label>
            <Input
              placeholder="Утасны дугаар оруулах..."
              className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
              value={inputData.phoneNumber}
              onChange={(e) => handleInputChange(e.target.value, "phoneNumber")}
            />
          </div>
        </div>

        {/* Add button */}
        <div className="w-full flex flex-col justify-end">
          {!formValid && (
            <p className="text-red-500 w-full text-right my-4">
              Please fill out all the fields.
            </p>
          )}

          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
              onClick={handleRegisterManager}
            >
              Нэмэх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeRegistration;
