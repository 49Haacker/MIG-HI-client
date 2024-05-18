import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FullPageLoader from "@/components/ui/FullPageLoader";
import { useInsuranceContext } from '@/customer/Context/InsuranceData';

import * as React from "react";
import axios from "@/axios"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import "@/shared-css/CustomScroller.css";
import { useNavigate } from "react-router-dom";

interface EmployeeData {
  name: string;
  ProductName: string;
  RegisterNo: string;
  country: string;
  city: string;
  BeginDate: string;
  EndDate: string;
  Rate: string;
  StatusName: string;
}

const ListContracts = () => {
  const [insuranceData, setInsuranceData] = React.useState<EmployeeData[]>([]);
  const  {data, updateData} = useInsuranceContext();
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [registerNumber , setRegisterNumber] = React.useState<string | null>('');
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);




  React.useEffect(() => {
    setLoading(true); // Ensure loading is true before fetching
    axios
      .get('current-customer')
      .then((response) => {
        setRegisterNumber(response.data.customer.RegisterNo);
        setLoading(false);
        console.info(error);
        console.info(data);

      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // No dependencies, this effect runs only once on component mount


  React.useEffect(() => {
    if (registerNumber) { // Ensure registerNumber is not empty or undefined
      setLoading(true); // Set loading before fetching
      axios
        .get(`Guarantee/List?RegisterNo=${registerNumber}`)
        // .get(`Guarantee/List?RegisterNo=НМ66040816`)
        .then((response) => {
          console.info('Axios response', response.data);
          setInsuranceData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [registerNumber]); 


  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const filteredData = selectedType
    ? insuranceData.filter((insurance) => insurance.StatusName === selectedType)
    : insuranceData;


  const handleMoreData = (insurance: any | EmployeeData) => {
      updateData([insurance]);
  navigate('/insurance-contract/contract-details', {
    state: { insurance }, // Correct data structure for state
  });

  };



  return (
    <>
      <div className="flex flex-col lg:w-full lg:overflow-hidden overflow-x-scroll w-[58em]">
        <FullPageLoader isLoading={loading} />
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
                      value="Идэвхтэй"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                     Идэвхтэй
                    </SelectItem>
                    <SelectItem
                      value="Хугацаа дууссан"
                      className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                    >
                      Хугацаа дууссан
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
                  insurance.StatusName === "Хугацаа дууссан" && "bg-[#F3F7F9]"
                }`}
              >
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px] col-span-2">
                  {insurance.ProductName}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.BeginDate}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.EndDate}
                </span>
                <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                  {insurance.Rate}
                </span>

                <div className=" w-full">
                  <Button
                    className={`rounded-full h-[24px] w-fit ${
                      insurance.StatusName === "Идэвхтэй"
                        ? "bg-[#00A27B29] hover:bg-[#00A27A37] text-[#00A27B]"
                        : "bg-[#FF5C5E29] hover:bg-[#FF5C4F18] text-[#FF5C5E]"
                    }`}
                  >
                    {insurance.StatusName}
                  </Button>
                </div>

                {/* More */}
                <span
                  className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                  onClick={() => handleMoreData(insurance)}
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
