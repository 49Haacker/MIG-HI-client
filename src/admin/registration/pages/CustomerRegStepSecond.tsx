import React, { ChangeEvent, useRef, useState } from "react";
import FullPageLoader from '@/components/ui/FullPageLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "@/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const CustomerRegStepSecond: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (file: File) => {
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("excelFile", file);

      const config: AxiosRequestConfig = {
        onUploadProgress: progressEvent => {  
         
          console.info(`File upload progress: ${progressEvent}%`);
          console.info(selectedFile);
        }
      };

      setIsLoading(true);
      try {
        const response: AxiosResponse<any> = await axios.post("customers-excel-upload", formData, config);
        setIsLoading(false);
        toast.success("File uploaded successfully");
        console.info(response);
        setSelectedFile(null);
      } catch (error) {
        setIsLoading(false);
        toast.error("File upload failed");
       
      }
    }
  };
  
  const handleFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isExcelFile(file)) {
      handleFileChange(file);
    } else {
      toast.error("Please select a valid Excel file.");
    }
  };

  const isExcelFile = (file: File) => {
    return file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
           file.type === 'application/vnd.ms-excel';
  };

  return (
    <>
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
                accept=".xlsx,.xls"
                onChange={handleFileLoad}
              />
            </label>

            <span className="text-xs text-[#005F7E] absolute bottom-4">
              Хуулах
            </span>
          </div>
        </div>
      </div>
      <FullPageLoader isLoading={isLoading} />
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

export default CustomerRegStepSecond;
