import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";

import axios from "@/axios";

const CustomerRegStepSecond = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitData = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      try {
        const response = await axios.post("customers-excel-upload", formData);

        console.log("File uploaded successfully:", response.data);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <>
        {/* Excel data entry */}
        <div className="flex flex-col justify-between w-full mt-8">
          <div className="flex flex-col gap-4 justify-between w-full">
            <span className="text-sm text-[#424B5A]">
              Excel мэдээлэл оруулах
            </span>

            <div
              className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
              onClick={handleImageClick}
              style={{ position: "relative" }}
            >
              <label htmlFor="ecxelDataEntry" className="cursor-pointer">
                <img
                  src="/assets/customer/employee/uploadIcon.svg"
                  alt="uploadIcon"
                  className="absolute inset-0 m-auto"
                />
                <input
                  id="ecxelDataEntry"
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

          {/* Add button */}
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
              onClick={handleSubmitData}
            >
              Нэмэх
            </Button>
          </div>
        </div>
      </>
    </>
  );
};

export default CustomerRegStepSecond;
