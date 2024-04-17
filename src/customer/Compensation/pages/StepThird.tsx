import { ChangeEvent, useRef } from "react";

const StepThird = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
      <div className="flex justify-between flex-col w-full mt-8">
        <div className="flex gap-8 flex-col w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#424B5A] font-medium text-2xl leading-4">
              Нөхөн төлбөрийн матерал хуулах
            </h1>
            <p className="text-[#8CAAB1] font-normal leading-4">
              **Та оруулж байгаа бичиг баримтын зургийг тод гаргацтай авч
              оруулна уу. Мөн (<span className="text-red-500">*</span>)-оор
              тэмдэглэсэн талбарыг заавал бөглөнө үү.
            </p>
          </div>

          <div className="flex flex-col w-full">
            {/* 1. Reimbursement form,  */}
            <div className="flex flex-col sm:grid grid-cols-3 gap-2 my-3">
              {/*1. Reimbursement form*/}
              <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                <span className="text-[#424B5A] text-md font-normal leading-4">
                  1. Нөхөн төлбөрийн маягт
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/add.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingLicense"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Нэмэх
                    {/* add */}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Refund request page */}
            <div className="flex flex-col sm:grid grid-cols-3 gap-2 my-3">
              <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                <span className="text-[#424B5A] text-md font-normal leading-4">
                  2. Нөхөн төлбөр хүсэх хуудас{" "}
                  <span className="text-red-500">*</span>
                </span>

                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/add.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingLicense"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Нэмэх
                    {/* add */}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Doctor's diagnosis, analysis and opinion */}
            <div className="flex flex-col sm:grid grid-cols-3 gap-2 my-3">
              <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                <span className="text-[#424B5A] text-md font-normal leading-4">
                  3. Эмчийн онош, шинжилгээ, дүгнэлт{" "}
                  <span className="text-red-500">*</span>
                </span>

                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/add.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingLicense"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Нэмэх
                    {/* add */}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Paid e-documents */}
            <div className="flex flex-col sm:grid grid-cols-3 gap-2 my-3">
              <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                <span className="text-[#424B5A] text-md font-normal leading-4">
                  4. Төлбөр төлсөн и-баримтууд{" "}
                  <span className="text-red-500">*</span>
                </span>

                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/add.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingLicense"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Нэмэх
                    {/* add */}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Other /Prescriptions and prescription purchases/ */}
            <div className="flex flex-col sm:grid grid-cols-3 gap-2 my-3">
              <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                <span className="text-[#424B5A] text-md font-normal leading-4">
                  5. Бусад /Эмийн жор, жорын дагуух худалдан авалтууд/{" "}
                  <span className="text-red-500">*</span>
                </span>
                <div
                  className="bg-[#E6EFF2] h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="photoId" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/uploadIcon.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="photoId"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Хуулах
                    {/* copy */}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className="h-[96px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                  onClick={handleImageClick}
                  style={{ position: "relative" }}
                >
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    <img
                      src="/assets/customer/employee/add.svg"
                      alt="uploadIcon"
                      className="absolute inset-0 m-auto"
                    />
                    <input
                      id="drivingLicense"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-xs text-[#005F7E] absolute bottom-4">
                    Нэмэх
                    {/* add */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full my-8">
          <button className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#004F6F] p-2 rounded-md w-full sm:w-1/6">
            Илгээх
          </button>
        </div>
      </div>
    </>
  );
};

export default StepThird;
