import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import compensationListDataJson from "../../../../json/adminCompensationList.json";
import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";

interface compensationListData {
  this_one: string;
  name: string;
  register_number: string;
  phone_number: string;
  status: string;
}

const CompensationList = () => {
  const [compensationListData, setCompensationListData] = React.useState<
    compensationListData[]
  >([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setCompensationListData(compensationListDataJson);
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // console.log("value = ", value);
  };

  const filteredData = selectedType
    ? compensationListData.filter(
        (compensationList) => compensationList.status === selectedType
      )
    : compensationListData;

  return (
    <>
      {/* pending this table only  */}
      {compensationListData.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src="/assets/customer/employee/emptyClaimHistory.svg"
            alt="emptyClaimHistory"
          />

          <span className="text-[#424B5A] text-sm font-normal leading-3">
            Танд одоогоор үүсгэсэн нөхөн төлбөрийн хүсэлт байхгүй байна.
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full overflow-x-scroll lg:overflow-hidden">
          <div className="flex gap-8 flex-col items-center w-full min-w-max lg:min-w-0">
            <div className="grid grid-cols-7 gap-2 px-3 py-4 h-auto bg-[#E6EFF2] rounded-md w-full whitespace-nowrap">
              {/* This one */}
              <div className="flex flex-col gap-2 w-auto">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Овог
                </label>
                <Input />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Нэр
                </label>
                <Input />
              </div>

              {/* Register number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Регистрийн дугаар
                </label>
                <Input />
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Утасны дугаар
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
                        value="Хүлээн авсан"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Хүлээн авсан
                      </SelectItem>
                      <SelectItem
                        value="Хянаж байгаа"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Хянаж байгаа
                      </SelectItem>
                      <SelectItem
                        value="Төлбөр хийгдэж байгаа"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Төлбөр хийгдэж байгаа
                      </SelectItem>
                      <SelectItem
                        value="Төлөгдсөн"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Төлөгдсөн
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
              {filteredData.map((items, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-7 items-center justify-start px-3 py-2 w-full h-[52px] cursor-pointer whitespace-nowrap ${
                    (items.status === "Хянаж байгаа" ||
                      items.status === "Төлөгдсөн") &&
                    "bg-[#F3F7F9]"
                  }`}
                >
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {items.this_one}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {items.name}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {items.register_number}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {items.phone_number}
                  </span>

                  <div className=" w-full col-span-2">
                    <Button
                      className={`rounded-full h-[24px] ${
                        items.status === "Хүлээн авсан"
                          ? "bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E]"
                          : items.status === "Хянаж байгаа"
                          ? "bg-[#F4926829] hover:bg-[#F4926829] text-[#F49268]"
                          : items.status === "Төлбөр хийгдэж байгаа"
                          ? "bg-[#AED03829] hover:bg-[#AED03829] text-[#AED038]"
                          : items.status === "Төлөгдсөн"
                          ? "bg-[#00A27B29] hover:bg-[#00A27B29] text-[#00A27B]"
                          : ""
                      }`}
                    >
                      {items.status}
                    </Button>
                  </div>

                  {/* More */}
                  <span
                    className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                    onClick={() =>
                      navigate("/admin/compensation/reimbursement-details")
                    }
                  >
                    Дэлгэрэнгүй
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompensationList;
