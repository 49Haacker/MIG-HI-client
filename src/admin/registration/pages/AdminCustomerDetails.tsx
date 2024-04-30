import { Button } from "@/components/ui/button";

const AdminCustomerDetails = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col md:flex-row items-start gap-12 w-full">
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-5 bg-[#E8EEEF] h-[443px] px-6 py-8 rounded-md whitespace-nowrap">
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Овог
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нэр
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Регистрийн дугаар
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Утасны дугаар
              </span>
            </div>

            <div className="flex flex-col gap-5 px-6 py-8 rounded-md">
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                Цогтбаатар
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                Энхжавхлан
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                AA00000000
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                9999 9999
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col xl:flex-row gap-4 w-full">
              <div className="w-full">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  Иргэний үнэмлэх (урд тал)
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/firstDocumnet.svg"
                    alt="firstDocumnet.svg"
                  />
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  Иргэний үнэмлэх (ар тал)
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/thirdDocumnet.svg"
                    alt="thirdDocumnet"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-4 w-full">
              <div className="w-full">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  Жолооны үнэмлэх (урд тал)
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/secondDocumnet.svg"
                    alt="secondDocumnet"
                  />
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  Жолооны үнэмлэх (ар тал)
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/fourthDocumnet.svg"
                    alt="fourthDocumnet"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-full xl:w-1/2">
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  Жолооны үнэмлэх (урд тал)
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/fifthDocumnet.svg"
                    alt="fifthDocumnet"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button className="bg-inherit hover:bg-inherit border border-[#00A27B] text-[#00A27B] font-bold text-[18px] leading-[23.18px] rounded-full">
            Хадгалах
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminCustomerDetails;
