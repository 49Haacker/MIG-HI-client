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
import { ChangeEvent, useRef, useState } from "react";

const CustomerRegStepFirst = () => {
  const [isChecked, setIsChecked] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
    console.log(isChecked);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle file selection here
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
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
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[17.36px]">
                Нэр
              </Label>
              <Input
                placeholder="Нэр оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                Утасны дугаар
              </Label>
              <Input
                placeholder="Утасны дугаар оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
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

                <div className="flex">
                  <Input
                    placeholder="Дугаар"
                    className="text-[#B3CFD8] font-medium text-[14px] leading-[14px] placeholder:text-[#B3CFD8]"
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
                onClick={handleImageClick}
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
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
                onClick={handleImageClick}
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
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
                onClick={handleImageClick}
                style={{ position: "relative" }} // Add position relative to container
              >
                <label htmlFor="vehicleCertificate" className="cursor-pointer">
                  <img
                    src="/assets/customer/employee/uploadIcon.svg"
                    alt="uploadIcon"
                    className="absolute inset-0 m-auto"
                  />
                  <input
                    id="vehicleCertificate"
                    type="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
                onClick={handleImageClick}
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
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
                onClick={handleImageClick}
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
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
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
    </>
  );
};

export default CustomerRegStepFirst;
