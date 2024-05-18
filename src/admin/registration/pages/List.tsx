  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";

  import axios  from "@/axios";
  import { AxiosResponse }   from "axios";

  import * as React from "react";
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

  interface ListData {
    LastName: string;
    Name: string;
    RegisterNumber: string;
    PhoneNo: string;
    UserTypeText: string;
  }
  interface Filters {
    LastName?: string;
    Name?: string;
    RegisterNumber?: string;
    PhoneNo?: string;
  }


  const List = () => {
    const [listData, setListData] = React.useState<ListData[]>([]);
    const [selectedType, setSelectedType] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const [fieldValues, setFieldValues] = React.useState({
      LastName: "",
      Name: "",
      RegisterNumber: "",
      PhoneNo: "",
    });
  

    // if api come then in useEffect make a function and call that api and out of function call that function
    React.useEffect(() => {
    
    }, []);




    const fetchAdmins = async (filters: Filters): Promise<void> => {
      try {
        // Construct query parameters from the filters object
        const queryParams = Object.entries(filters)
          .filter(([_, value]) => !!value) // Filter out empty values
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // URL-encode values
          .join("&"); // Join them with '&' to create the query string
    
        const response: AxiosResponse<{ data: ListData[] }> = await axios.get(
          `get-admins?${queryParams}`
        ); // Pass query parameters
        
        // Assuming response contains a `data` field with a `data` array inside it
        setListData(response.data.data);
      } catch (error) {
        setListData([]);
        // Log the error with type safety
        console.error("Error fetching admins:", error instanceof Error ? error.message : error);
      }
    };


    React.useEffect(() => {
      fetchAdmins(fieldValues); // Fetch with the current filters
    }, [fieldValues]);

    
    const handleInputChange = (field: string, value: string) => {
      setFieldValues((prev) => ({
        ...prev,
        [field]: value,
      }));

     
    };




    const handleTypeChange = (value: string) => {
      setSelectedType(value);
      // console.log("value = ", value);
    };

    const filteredData = selectedType
      ? listData.filter((insurance) => insurance.UserTypeText === selectedType)
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
              
                <Input
              id="last-name"
              value={fieldValues.LastName}
              onChange={(e) => handleInputChange("LastName", e.target.value)}
            />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Нэр
                </label>
                <Input
              id="last-name"
              value={fieldValues.Name}
              onChange={(e) => handleInputChange("Name", e.target.value)}
            />
              </div>

              {/* Register number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Регистрийн дугаар
                </label>
               
                <Input
              id="name"
              value={fieldValues.RegisterNumber}
              onChange={(e) => handleInputChange("RegisterNumber", e.target.value)}
            />
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[#005F7E] font-semibold text-[12px] leading-[12px]"
                >
                  Утасны дугаар
                </label>
                <Input
                  id="name"
                  value={fieldValues.PhoneNo}
                  onChange={(e) => handleInputChange("PhoneNo", e.target.value)}
                />
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
                        value="Manager"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Manager
                      </SelectItem>
                      <SelectItem
                        value="Admin"
                        className="text-[#424B5A] font-normal text-[14px] leading-[14px]"
                      >
                        Admin
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
                    list.UserTypeText === "Менежер" && "bg-[#F3F7F9]"
                  }`}
                >
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {list.LastName}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {list.Name}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {list.RegisterNumber}
                  </span>
                  <span className="text-[#424B5A] font-normal text-[14px] leading-[14px]">
                    {list.PhoneNo}
                  </span>

                  <div className=" w-full">
                    <Button
                      className={`bg-inherit hover:bg-background text-[#424B5A] font-normal text-[14px] leading-[14px]`}
                    >
                      {list.UserTypeText}
                    </Button>
                  </div>

                  {/* More */}
                  <span
                    className="text-[#005F7E] underline underline-offset-4 text-[14px] leading-[14px] font-medium cursor-pointer"
                    onClick={() => {
                      list.UserTypeText === "Менежер"
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
