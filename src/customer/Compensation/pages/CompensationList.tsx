import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import insuranceDataJson from "../../../../json/insuranceData.json";
import "@/shared-css/CustomScroller.css";

interface EmployeeData {
  name: string;
  userId: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: string;
}

const CompensationList = () => {
  const [date, setDate] = React.useState<Date>();

  const [insuranceData, setInsuranceData] = React.useState<EmployeeData[]>([]);

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setInsuranceData(insuranceDataJson);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full overflow-x-scroll lg:overflow-hidden">
        {/* search & sort by date */}
        <div className="flex gap-4 items-center min-w-max lg:min-w-0">
          <div className="relative">
            <img
              src="/assets/customer/employee/searchIcon.svg"
              alt="searchIcon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-[16px] h-[16px]"
            />
            <Input
              type="search"
              placeholder="Хайх утга оруулах..."
              className="pl-8 placeholder:text-[#D1DDE0]"
            />
          </div>

          <hr className="border border-[#C2D1D9] w-[32px] rotate-90" />

          {/* Sort by date... */}
          <div className="my-3 mx-6">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex">
                  <Input
                    type="search"
                    className="rounded-r-none text-[#D1DDE0]"
                    value={date ? format(date, "PPP") : "Огноогоор шүүх..."}
                    readOnly
                  />
                  <Button
                    type="submit"
                    className="bg-[#005F7E] hover:bg-[#014F6f] rounded-l-none"
                  >
                    <img
                      src="/assets/customer/employee/sortDate.svg"
                      alt="sortDate"
                      className="w-[16px] h-[16px]"
                    />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-8 flex-col lg:items-center w-full min-w-max lg:min-w-0">
          {/* top tabs */}
          <div className="grid grid-cols-7 gap-2 px-3 py-4 h-auto bg-[#E8EEEF] rounded-md">
            {/*  */}
            <div className="flex flex-col gap-2 whitespace-nowrap">
              <label htmlFor="" className="text-[#005F7E]">
                ID дугаар
              </label>
              <Input />
            </div>

            {/*  */}
            <div className="flex flex-col gap-2 whitespace-nowrap">
              <label htmlFor="" className="text-[#005F7E]">
                Илгээсэн огноо
              </label>
              <Input />
            </div>

            {/*  */}
            <div className="flex flex-col gap-2 whitespace-nowrap">
              <label htmlFor="" className="text-[#005F7E]">
                Хуваарилах
              </label>
              <Input />
            </div>

            {/*  */}
            <div className="flex flex-col gap-2 whitespace-nowrap">
              <label htmlFor="" className="text-[#005F7E]">
                Төлөв
              </label>
              <Input />
            </div>

            {/*  */}
            <div className="flex flex-col gap-2 whitespace-nowrap">
              <label htmlFor="" className="text-[#005F7E]">
                I(ай)-тай дугаар
              </label>
              <Input />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 h-[45vh] overflow-y-auto custom-scroller-design">
            {insuranceData.map((insurance, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-3 items-center justify-start w-full px-3"
              >
                <span className="text-[#005F7E] underline underline-offset-4">
                  {insurance.userId}
                </span>

                <span className="text-[#424B5A]">
                  {insurance.startDate}, {insurance.amount}
                </span>

                <div className="w-full">
                  <Select>
                    <SelectTrigger className="h-7 focus:outline-none focus:ring-0 focus:border-none rounded-full">
                      <SelectValue placeholder="Нөхөн төлбөрийн захирал" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <Button
                    className={`${
                      insurance.status === "Идэвхитэй"
                        ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B] rounded-full"
                        : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E] rounded-full"
                    }`}
                  >
                    {insurance.status}
                  </Button>
                </div>

                {/* <div className="flex items-center justify-between"> */}
                <div className="w-full flex gap-8 col-span-2">
                  <p>I2322776</p>
                  <img
                    src="/assets/customer/employee/editIcon.svg"
                    alt="editIcon"
                  />
                </div>

                <img
                  src="/assets/customer/employee/deleteIcon.svg"
                  alt="deleteIcon"
                />
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompensationList;
