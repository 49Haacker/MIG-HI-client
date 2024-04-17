import { Button } from "@/components/ui/button";

const ReimbursementDetails = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex items-start gap-12 w-full">
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
                Бүтээгдэхүүний нэр
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Төлөв
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нийт үнэлгээ (₮)
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нийт хураамж
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нөхөн төлбөрийн <br /> тохиолдлын товч <br />
                агуулга
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
                Эрүүл мэндийн даатгал
              </span>

              <div className=" w-full">
                <Button className="bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E] rounded-full h-[24px] w-[83px]">
                  Хүлээн авсан
                </Button>
              </div>

              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                30,000,000
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                5,000,000
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </div>

          <div className="flex gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  1. Нөхөн төлбөрийн маягт
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/firstDocumnet.svg"
                    alt="firstDocumnet.svg"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  3. Эмчийн онош, шинжилгээ, дүгнэлт
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/thirdDocumnet.svg"
                    alt="thirdDocumnet"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  5. Бусад /Эмийн жор, жорын дагуух худалдан авалтууд/
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/fifthDocumnet.svg"
                    alt="fifthDocumnet"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div>
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  2. Нөхөн төлбөр хүсэх хуудас
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/secondDocumnet.svg"
                    alt="secondDocumnet"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                  4. Төлбөр төлсөн и-баримтууд
                </h1>
                <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                  <img
                    src="/assets/customer/reimbursementDetails/fourthDocumnet.svg"
                    alt="fourthDocumnet"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReimbursementDetails;
