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

import FullPageLoader from "@/components/ui/FullPageLoader";

// import listOfContactDataJson from "../../../../json/adminListOfContactData.json";

import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";
import axios from "@/axios";

interface ListOfContactData {
  StatusName: string;
  LastName: string;
  FirstName: string;
  RegisterNo: string;
  ProductID: string;
  StatusNameName: string;
}

const ListContracts = () => {
  const [loading , setLoading] = React.useState(false);
  const [listOfContactData, setListOfContactData] = React.useState<
    ListOfContactData[]
  >([]);



  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const RegisterNo = 'ОЙ99013005';

  // if api come then in useEffect make a function and call that api and out of function call that function
  React.useEffect(() => {
    setLoading(true);
    axios.get(`Guarantee/List?RegisterNo=${RegisterNo}`).then((res)=>{

      setListOfContactData(res.data);


    }).catch((error)=>{
    setLoading(false);
      
    }).then(()=>{
    setLoading(false);

    });
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    // console.log("value = ", value);
  };

  



  const filteredData = selectedType
    ? listOfContactData.filter(
        (listOfContacts) => listOfContacts.StatusName == selectedType
      )
    : listOfContactData;

  return (
    <>
      <div className="flex flex-col lg:w-full lg:overflow-hidden overflow-x-scroll w-[58em]">
        <FullPageLoader isLoading={loading}/>
        <div className="flex gap-8 flex-col items-center w-full min-w-max lg:min-w-0">
          <div className="grid grid-cols-6 max-[1023px]:grid-cols-8 min-[1224px]:grid-cols-8 gap-2 px-3 py-4 h-auto bg-[#E6EFF2] rounded-md w-full whitespace-nowrap">
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
                      value="Идэвхтэй"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Идэвхтэй
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
            {filteredData.map((items, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 max-[1023px]:grid-cols-8 min-[1224px]:grid-cols-8 items-center justify-start px-3 py-2 w-full h-[52px] cursor-pointer ${
                  items.StatusName === "Идэвхигүй" && "bg-[#F3F7F9]"
                }`}
              >
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {items.LastName}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {items.FirstName}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {items.RegisterNo}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {items.ProductID}
                </span>

                <div className=" w-full">
                  <Button
                    className={`rounded-full h-[24px] w-[83px] ${
                      items.StatusName === "Идэвхитэй"
                        ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B]"
                        : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E]"
                    }`}
                  >
                    {items.StatusName}
                  </Button>
                </div>

                {/* More */}
                <span
                  className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                  onClick={() =>
                    navigate("/admin/insurance-contract/contract-details")
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
