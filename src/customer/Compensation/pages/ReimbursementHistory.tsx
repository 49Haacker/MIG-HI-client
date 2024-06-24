import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/axios"
import {useReimbursementContext} from "@/customer/Context/ReimbursementData"

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
  [x: string]: any;
  firstName: string;
  ProductName: string;
  registerNo: string;
  country: string;
  city: string;
  beginDate: string;
  endDate: string;
  invoiceAmount: string;
  statusName: string;
  BeginDate: string;
  EndDate: string;
  Rate: string;
}

const ReimbursementHistory = () => {
  const  {updateData} = useReimbursementContext();
  const [reimbursementData, setReimbursementData] = React.useState<
    EmployeeData[]
  >([]);
  const [selectedType, setSelectedType] = React.useState<string | null>('бүгдийг харуулах');
  const [finallReimbursementdetailsData, setFinalReimbursementdetailsData] = React.useState<EmployeeData[]>([]);
  const [all,setAll] = React.useState<EmployeeData[]>([]);
  const navigate = useNavigate();
  const [registerNumber , setRegisterNumber] = React.useState<string | null>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    Rate: '',
    EndDate: '',
    BeginDate: '',
    ProductName: ''
  });
  
  React.useEffect(() => {
    setLoading(true); 
    axios.get('current-customer')
      .then((response) => {
        setRegisterNumber(response.data.customer.RegisterNo);
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
          console.log(res.data.quitsLists[0]);
          setReimbursementData(res.data.quitsLists[0]);
          setFinalReimbursementdetailsData(res.data.quitsLists[0]);
          setAll(res.data.quitsLists[1]);
           setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching quits list:", error);
           setLoading(false); 
        });
    }
  }, [registerNumber]);

  
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleMoreData = (reimbursement: any | EmployeeData) => {
    updateData([reimbursement,all]);
  navigate('/compensation/reimbursement-details', {
    state: { reimbursement ,all }, // Correct data structure for state
  });

  };


  React.useEffect(() => {
    const isEmptySearch = Object.values(formValues).every(value => value === '');
    if (!isEmptySearch) {
      let filteredData = finallReimbursementdetailsData;
  
      // Filter by Rate
      if (formValues.Rate !== '') {
        filteredData = filteredData.filter((item) => String(item.rate).includes(String(formValues.Rate)));
      }
  
      // Filter by EndDate
      if (formValues.EndDate !== '') {
        filteredData = filteredData.filter((item) => item.endDate.includes(formValues.EndDate));
      }
  
      // Filter by BeginDate
      if (formValues.BeginDate !== '') {
        filteredData = filteredData.filter((item) => item.beginDate.includes(formValues.BeginDate));
      }
  
      // Filter by ProductName
      if (formValues.ProductName.length > 0) {
        filteredData = filteredData.filter((item) => {
          const fieldValue = item.productName.toLowerCase();
          const searchTerm = formValues.ProductName.toLowerCase();
          return fieldValue.includes(searchTerm);
        });
      }
  
      console.log(filteredData);
      setReimbursementData(filteredData); 
    } else {
      setReimbursementData(finallReimbursementdetailsData);
    }
  }, [formValues]);
  


  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };



  const filteredData = selectedType && selectedType !== 'бүгдийг харуулах'
    ? reimbursementData.filter(
        (reimbursement) => reimbursement.statusName === selectedType
      )
    : reimbursementData;

  return (
    <>

      {/* pending this table only  */}
      {!reimbursementData ? (
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
      <FullPageLoader isLoading={loading} />

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
                <Input
              id="ProductName"
              name="ProductName"
              value={formValues.ProductName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2"
              type="text"
            />
              </div>

              {/* Start date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Эхлэх огноо
                </label>
                {/* <Input /> */}
                <Input
              id="BeginDate"
              name="BeginDate"
              value={formValues.BeginDate}
              onChange={handleInputChange}
              type="text"
            />
              </div>

              {/* End date */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Дуусах огноо
                </label>
                <Input
              id="EndDate"
              name="EndDate"
              value={formValues.EndDate}
              onChange={handleInputChange}
              type="text"
            />
              </div>

              {/* Overall rating */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Нийт үнэлгээ
                </label>
                <Input
              id="Rate"
              name="Rate"
              value={formValues.Rate}
              onChange={handleInputChange}
              type="text"
            />
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
                  <SelectTrigger className="flex items-end justify-center w-fit gap-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    {/* Илгээсэн
                    Тооцоолж буй
                    Хянаж буй
                    Санхүү
                    Олгосон or Олгоогүй
                    Материал илгээсэн
                    Санхүү
                    Материал илгээсэн
                    бүгдийг харуулах
                    
                    */}
                      <SelectItem
                        value="Илгээсэн"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Илгээсэн
                      </SelectItem>
                      <SelectItem
                        value="Тооцоолж буй"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Тооцоолж буй
                      </SelectItem>
                      <SelectItem
                        value="Хянаж буй"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Хянаж буй
                      </SelectItem>
                      <SelectItem
                        value="Санхүү"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Санхүү
                      </SelectItem>
                      <SelectItem
                        value="Олгосон or Олгоогүй"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Олгосон or Олгоогүй
                      </SelectItem>
                      <SelectItem
                        value="Материал илгээсэн"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Материал илгээсэн
                      </SelectItem>
                      <SelectItem
                        value="бүгдийг харуулах"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                       бүгдийг харуулах
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

            <div className="flex flex-col w-full gap-2  overflow-y-auto custom-scroller-design" style={{height:'calc(100vh - 354px)'}}>
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
                    {reimbursement.rate}
                  </span>

                  <div className=" w-full min-[1024px]:col-span-2">
                    <Button
                      className={`rounded-full h-[24px] ${
                        reimbursement.statusName === "Илгээсэн"
                          ? "bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E]"
                          : reimbursement.statusName === "Тооцоолж буй"
                          ? "bg-[#F4926829] hover:bg-[#F4926829] text-[#F49268]"
                          : reimbursement.statusName === "Хянаж буй"
                          ? "bg-[#AED03829] hover:bg-[#AED03829] text-[#AED038]"
                          : reimbursement.statusName === "Олгосон or"
                          ? "bg-[#00A27B29] hover:bg-[#00A27B29] text-[#00A27B]"
                          : reimbursement.statusName === "Олгоогүй"
                          ? "bg-[#E6EFF2] hover:bg-[#00A27B29] text-[#E6EFF2]"
                          : reimbursement.statusName === "Санхүү"
                          ? "bg-[#F4926829] hover:bg-[#F4926829] text-[#F49268]"
                          : reimbursement.statusName === "Материал илгээсэн"
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
                      handleMoreData(reimbursement)
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
