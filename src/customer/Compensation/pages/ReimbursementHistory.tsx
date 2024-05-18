import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/axios"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReimbursementDataJson from "../../../../json/reimbursementHistory.json";
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

const ReimbursementHistory = () => {
  const [reimbursementData, setReimbursementData] = React.useState<
    EmployeeData[]
  >([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setReimbursementData(ReimbursementDataJson);
  }, []);

  React.useEffect(() => {

    axios.get('Quits/List?SearchTypeId=3&SearchValue=all').then((res) => {

        console.log(res.data);

    }).then().catch();

  } ,[]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // console.log("value = ", value);
  };

  const filteredData = selectedType
    ? reimbursementData.filter(
        (reimbursement) => reimbursement.status === selectedType
      )
    : reimbursementData;

  return (
    <>
      {/* pending this table only  */}
      {reimbursementData.length === 0 ? (
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
            <div className="grid grid-cols-8 sm:grid-cols-8 gap-2 px-3 py-4 h-auto bg-[#E6EFF2] rounded-md w-full whitespace-nowrap">
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
              {filteredData.map((reimbursement, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-8 sm:grid-cols-8 items-center justify-start px-3 py-2 w-full h-[52px] cursor-pointer ${
                    (reimbursement.status === "Хянаж байгаа" ||
                      reimbursement.status === "Төлөгдсөн") &&
                    "bg-[#F3F7F9]"
                  }`}
                >
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px] col-span-2">
                    {reimbursement.product_name}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.startDate}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.endDate}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.amount}
                  </span>

                  <div className=" w-full min-[1024px]:col-span-2">
                    <Button
                      className={`rounded-full h-[24px] ${
                        reimbursement.status === "Хүлээн авсан"
                          ? "bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E]"
                          : reimbursement.status === "Хянаж байгаа"
                          ? "bg-[#F4926829] hover:bg-[#F4926829] text-[#F49268]"
                          : reimbursement.status === "Төлбөр хийгдэж байгаа"
                          ? "bg-[#AED03829] hover:bg-[#AED03829] text-[#AED038]"
                          : reimbursement.status === "Төлөгдсөн"
                          ? "bg-[#00A27B29] hover:bg-[#00A27B29] text-[#00A27B]"
                          : ""
                      }`}
                    >
                      {reimbursement.status}
                    </Button>
                  </div>

                  {/* More */}
                  <span
                    className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                    onClick={() =>
                      navigate("/compensation/reimbursement-details")
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

export default ReimbursementHistory;
