import { ChangeEvent, useRef } from "react";

const CustomerRegStepSecond = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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
      <>
        {/* Excel data entry */}
        <div className="flex flex-col gap-2 w-full mt-8">
          <span className="text-sm text-[#424B5A]">Excel мэдээлэл оруулах</span>
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
      </>
    </>
  );
};

export default CustomerRegStepSecond;
