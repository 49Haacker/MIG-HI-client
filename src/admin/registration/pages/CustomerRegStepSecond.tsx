import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState } from "react";
import FullPageLoader from '@/components/ui/FullPageLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "@/axios";

const CustomerRegStepSecond = () => {

  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    await setSelectedFile(file);
    handleSubmitData();
  }
};

  const handleSubmitData = async () => {
    setIsLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      try {
        const response = await axios.post("customers-excel-upload", formData);
        if(response){

          setIsLoading(false);
          toast.success("File uploaded successfully");
        }
        console.log("File uploaded successfully:", response.data);
        setSelectedFile(null);
      } catch (error) {
        setIsLoading(false);
        toast.error(erro.data.message);
      
      
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
            {/* <Button
              type="submit"
              className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
              onClick={handleSubmitData}
            >
              Нэмэх
            </Button> */}
          </div>
        </div>
         <FullPageLoader isLoading={isLoading} />
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
      </>
    </>
  );
};

export default CustomerRegStepSecond;
