import { Button } from "@/components/ui/button";
import CancelContract from "@/customer/model/CancelContract";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useInsuranceContext } from '@/customer/Context/InsuranceData';


const ContractDetails = () => {

  const [customerData, setCustomerData] = useState<any | undefined>(undefined);
  
  const navigate = useNavigate();
  const { data } = useInsuranceContext();

  useEffect(() => {
    if (data && data.length === 0) {
      navigate('/insurance-contract/list-contracts'); // Navigate if no data
    } else if (data) {
      setCustomerData(data[0]); // Set customerData if there's data
    }
  }, [data, navigate]); // Add navigate to dependencies
  




  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-5 bg-[#E8EEEF] px-6 py-8 rounded-md whitespace-nowrap">
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
              Гэрээний дугаар
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Эхлэх огноо
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Дуусах огноо
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Төрөл
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Нийт үнэлгээ (₮)
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Нийт хураамж
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Excel мэдээлэл
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Гэрээний мэдээлэл
            </span>
            <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
              Гэрээний хавсралт
            </span>
          </div>

          <div className="flex flex-col gap-5 w-[177px] px-6 py-8 rounded-md whitespace-nowrap">
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.LastName ?? "N/A"}
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.FirstName ?? "N/A"}
              
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.RegisterNo ?? "N/A"}

            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.ProductName ?? "N/A"}
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.ContractId ?? "N/A"}
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.BeginDate ?? "N/A"}
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.EndDate ?? "N/A"}
            </span>
            {/* <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            status button
          </span> */}
            <div className="w-full mt-[-5px] mb-[-4px]">
              <Button
                className={`rounded-full   h-[24px] w-fit ${
                  customerData?.StatusName !== "Хугацаа дууссан"
                    ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B]"
                    : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E]"
                }`}
              >
                {/* {insurance.status} */}
                {customerData?.StatusName ?? "N/A"}
              </Button>
            </div>

            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.Rate ?? "N/A"}
            </span>
            <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
            {customerData?.PayAmount ?? "N/A"}
            </span>
            <span className="text-[#00A6B4] font-semibold underline underline-offset-3 text-[14px] leading-[14px] ">
            {customerData?.ExcelData ?? "N/A"}
            </span>
            <span className="text-[#00A6B4] font-semibold underline underline-offset-3 text-[14px] leading-[14px] ">
            {customerData?.ContractInformation ?? "N/A"}
            </span>
            <span className="text-[#00A6B4] font-semibold underline underline-offset-3 text-[14px] leading-[14px] ">
            {customerData?.ContractAttachments ?? "N/A"}
            </span>
          </div>
        </div>

        <div className="w-full">
          {/* <Button className="bg-background hover:bg-background text-[#FF5C5E] font-bold text-[18px] leading-[23.18px] border border-[#FF5C5E] rounded-full mb-4">
            Гэрээ цуцлах
          </Button> */}

          <CancelContract />
        </div>
      </div>
    </>
  );
};

export default ContractDetails;
