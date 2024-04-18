import { Button } from "@/components/ui/button";

const ManagerDetails = () => {
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

        <div className="w-full">
          <Button className="bg-inherit hover:bg-inherit border border-[#00A27B] text-[#00A27B] font-bold text-[18px] leading-[23.18px] rounded-full">
            Хадгалах
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManagerDetails;
