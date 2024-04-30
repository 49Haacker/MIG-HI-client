import { Button } from "@/components/ui/button";

const ContractDetails = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-4">
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
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Төрөл
            </span>
          </div>

          <div className="flex flex-col gap-5 w-[177px] px-6 py-8 rounded-md whitespace-nowrap">
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
              90000000
            </span>

            <div className=" w-full">
              <Button
                // className={`rounded-full h-[24px] w-[83px] ${
                //   insurance.status === "Идэвхитэй"
                //     ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B]"
                //     : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E]"
                // }`}
                className="bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B] rounded-full h-[24px] w-[83px]"
              >
                {/* {insurance.status} */}
                Идэвхитэй
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Button className="bg-background hover:bg-background text-[#FFBEBF] font-bold text-[18px] leading-[23.18px] border border-[#FFBEBF] rounded-full mb-4">
            Гэрээ цуцлах
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;
