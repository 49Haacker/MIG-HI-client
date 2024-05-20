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
import FullPageLoader from "@/components/ui/FullPageLoader";
import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";

interface EmployeeData {
  firstName: string;
  productName: string;
  registerNo: string;
  country: string;
  city: string;
  beginDate: string;
  endDate: string;
  invoiceAmount: string;
  statusName: string;
}

const ReimbursementHistory = () => {
  const [reimbursementData, setReimbursementData] = React.useState<
    EmployeeData[]
  >([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [registerNumber , setRegisterNumber] = React.useState<string | null>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    setLoading(true); 
    axios.get('current-customer')
      .then((response) => {
        setRegisterNumber(response.data.customer.RegisterNo);
        setLoading(false);
        console.info(error);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); 

  React.useEffect(() => {
    if (registerNumber) {
      axios.get(`Quits/List?SearchTypeId=3&SearchValue=${registerNumber}`)
        .then((res) => {
          console.log(res.data);
          setReimbursementData(res.data.quitsLists);
        })
        .catch((error) => {
          console.error("Error fetching quits list:", error);
        });
    }
  }, [registerNumber]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const filteredData = selectedType
    ? reimbursementData.filter(
        (reimbursement) => reimbursement.statusName === selectedType
      )
    : reimbursementData;

  return (
    <>
      <FullPageLoader isLoading={loading} />

      {/* pending this table only  */}
      {reimbursementData.length > 0 ? (
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
                    (reimbursement.statusName === "Хянаж байгаа" ||
                      reimbursement.statusName === "Төлөгдсөн") &&
                    "bg-[#F3F7F9]"
                  }`}
                >
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px] col-span-2">
                    {reimbursement.productName}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.beginDate}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.endDate}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {reimbursement.invoiceAmount}
                  </span>

                  <div className=" w-full min-[1024px]:col-span-2">
                    <Button
                      className={`rounded-full h-[24px] ${
                        reimbursement.statusName === "Хүлээн авсан"
                          ? "bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E]"
                          : reimbursement.statusName === "Хянаж байгаа"
                          ? "bg-[#F4926829] hover:bg-[#F4926829] text-[#F49268]"
                          : reimbursement.statusName === "Төлбөр хийгдэж байгаа"
                          ? "bg-[#AED03829] hover:bg-[#AED03829] text-[#AED038]"
                          : reimbursement.statusName === "Төлөгдсөн"
                          ? "bg-[#00A27B29] hover:bg-[#00A27B29] text-[#00A27B]"
                          : ""
                      }`}
                    >
                      {reimbursement.statusName}
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
