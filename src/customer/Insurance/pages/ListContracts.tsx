import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import insuranceDataJson from "../../../../json/insuranceData.json";

import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";

interface EmployeeData {
  name: string;
  product_name: string;
  userId: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: string;
}

const ListContracts = () => {
  const [insuranceData, setInsuranceData] = React.useState<EmployeeData[]>([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setInsuranceData(insuranceDataJson);
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // console.log("value = ", value);
  };

  const filteredData = selectedType
    ? insuranceData.filter((insurance) => insurance.status === selectedType)
    : insuranceData;

  return (
    <>
      <div className="flex flex-col lg:w-full lg:overflow-hidden overflow-x-scroll w-[58em]">
        <div className="flex gap-8 flex-col items-center w-full min-w-max lg:min-w-0">
          <div className="grid grid-cols-8 sm:grid-cols-7 gap-2 px-3 py-4 h-auto bg-[#E6EFF2] rounded-md w-full whitespace-nowrap">
            {/* Product name */}
            <div className="flex flex-col gap-2 w-auto col-span-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Бүтээгдэхүүний нэр
              </label>
              <Input />
            </div>

            {/* Start date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Эхлэх огноо
              </label>
              <Input />
            </div>

            {/* End date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Дуусах огноо
              </label>
              <Input />
            </div>

            {/* Overall rating */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Нийт үнэлгээ
              </label>
              <Input />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Төрөл
              </label>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Идэвхитэй"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Идэвхитэй
                    </SelectItem>
                    <SelectItem
                      value="Идэвхигүй"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Идэвхигүй
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              ></label>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 h-[45vh] overflow-y-auto custom-scroller-design">
            {filteredData.map((insurance, index) => (
              <div
                key={index}
                className={`grid grid-cols-8 sm:grid-cols-7 items-center justify-start px-3 py-2 w-full h-[52px] cursor-pointer ${
                  insurance.status === "Идэвхигүй" && "bg-[#F3F7F9]"
                }`}
              >
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px] col-span-2">
                  {insurance.product_name}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.startDate}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.endDate}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.amount}
                </span>

                <div className=" w-full">
                  <Button
                    className={`rounded-full h-[24px] w-[83px] ${
                      insurance.status === "Идэвхитэй"
                        ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B]"
                        : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E]"
                    }`}
                  >
                    {insurance.status}
                  </Button>
                </div>

                {/* More */}
                <span
                  className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                  onClick={() =>
                    navigate("/insurance-contract/contract-details")
                  }
                >
                  Дэлгэрэнгүй
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListContracts;
