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

import listDataJson from "../../../../json/adminListData.json";

import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";

interface ListData {
  this_one: string;
  name: string;
  register_number: string;
  phone_number: string;
  user_type: string;
}

const List = () => {
  const [listData, setListData] = React.useState<ListData[]>([]);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setListData(listDataJson);
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // console.log("value = ", value);
  };

  const filteredData = selectedType
    ? listData.filter((insurance) => insurance.user_type === selectedType)
    : listData;

  // const handleNavigate =()=>{
  //   if(listData)
  // }

  return (
    <>
      <div className="flex flex-col lg:w-full lg:overflow-hidden overflow-x-scroll w-[58em]">
        <div className="flex gap-8 flex-col items-center w-full min-w-max lg:min-w-0">
          <div className="grid grid-cols-6 max-[1023px]:grid-cols-9 min-[1224px]:grid-cols-7 gap-2 px-3 py-4 h-auto bg-[#E6EFF2] rounded-md w-full whitespace-nowrap">
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

            {/* user type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
              >
                Хэрэглэгчийн төрөл
              </label>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Харилцагч"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Харилцагч
                    </SelectItem>
                    <SelectItem
                      value="Менежер"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Менежер
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
            {filteredData.map((list, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 max-[1023px]:grid-cols-9 min-[1224px]:grid-cols-7 items-center justify-start px-3 py-2 w-full h-[52px] cursor-pointer ${
                  list.user_type === "Менежер" && "bg-[#F3F7F9]"
                }`}
              >
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {list.this_one}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {list.name}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {list.register_number}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {list.phone_number}
                </span>

                <div className=" w-full">
                  <Button
                    className={`bg-inherit hover:bg-background text-[#424B5A] font-normal text-[14px] leading-[14px]`}
                  >
                    {list.user_type}
                  </Button>
                </div>

                {/* More */}
                <span
                  className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                  onClick={() => {
                    list.user_type === "Менежер"
                      ? navigate("/admin/registration/manager-details")
                      : navigate("/admin/registration/admin-customer-details");
                  }}
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

export default List;
