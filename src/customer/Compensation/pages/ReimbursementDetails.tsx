import { Button } from "@/components/ui/button";
import { useReimbursementContext } from '../../Context/ReimbursementData';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/axios";

interface ReimbursementDataType {
  productDiscription: any;
  lastName?: string;
  firstName?: string;
  registerNo?: string;
  productName?: string;
  statusName?: string;
  rate?: string;
  invoiceAmount?: string;
}


const ReimbursementDetails = () => {
  const [ReimbursementData , setReimbursementData] = React.useState<ReimbursementDataType | null>(null);
  const [image , setImages] = React.useState(null);
  const navigate = useNavigate();
  const { data } = useReimbursementContext();

  useEffect(() => {
    console.log(data);
    if (data && data.length === 0) {
      navigate('/compensation/reimbursement-history');
    } else if (data) {
      setReimbursementData(data[0]); 

      axios.get('getClaimImg', { params: { sendClaimId: data[0].id } })
      .then((res) => {
        setImages(res.data.image);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        // This block executes after either .then() or .catch()
        // You can add cleanup code or actions that need to be executed regardless of success or failure
      });
    
    }
  }, [data, navigate]); 
  




  
  return (
    <>
      {ReimbursementData ? (<>
      
        <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col md:flex-row items-start gap-12 w-full">
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-5 bg-[#E8EEEF] h-[443px] px-6 py-8 rounded-md whitespace-nowrap">
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Овог
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нэр
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Регистрийн дугаар
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Бүтээгдэхүүний нэр
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Төлөв
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нийт үнэлгээ (₮)
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нийт хураамж
              </span>
              <span className="text-[#005F7E] font-semibold text-[14px] leading-[14px]">
                Нөхөн төлбөрийн <br /> тохиолдлын товч <br />
                агуулга
              </span>
            </div>

            <div className="flex  flex-col gap-5 px-6 py-8 rounded-md">
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                {data[1].LastName ? data[1].LastName : 'N/A' }
              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px] truncate hover:whitespace-normal hover:overflow-visible w-[170px]">
              {data[1].FirstName ? data[1].FirstName : 'N/A' }


              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
              {ReimbursementData.registerNo ? ReimbursementData.registerNo : 'N/A' }

              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
              {ReimbursementData.productName ? ReimbursementData.productName : 'N/A' }

              </span>

              <div className=" w-full">
                <Button className="bg-[#E6EFF2] hover:bg-[#E6EFF3] text-[#005F7E] rounded-full h-[24px] w-fit">
                {ReimbursementData.statusName ? ReimbursementData.statusName : 'N/A' }
                </Button>
              </div>

              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
              {ReimbursementData.rate ? ReimbursementData.rate : 'N/A' }

              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
              {ReimbursementData.invoiceAmount ? ReimbursementData.invoiceAmount : 'N/A' }

              </span>
              <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
               {ReimbursementData.productDiscription ? ReimbursementData.productDiscription : 'N/A' }
              </span>
            </div>
          </div>

          <div className="flex gap-[100] w-full">

          {image ? (
                  <div className="flex flex-col ml-0 lg:ml-[3%] gap-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
                    {image.map((item: { quitsType: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; f3: string | undefined; }, index: React.Key | null | undefined) => (
                      <div key={index}>
                        <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                          {item.quitsType ? (
                            <span>{item.quitsType}</span>
                          ) : (
                            null // or replace with an empty string "" if you prefer
                          )}
                        </h1>
                        <div className="  w-[230px] px-[12px] flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                          <img
                            src={item.f3}
                            alt="document"
                            className="w-[200px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  null // or replace with an empty string "" if you prefer
                )}


        
          </div>
        </div>
      </div>
      
      
      
      </>) : (<>
      
      
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src="/assets/customer/employee/emptyClaimHistory.svg"
            alt="emptyClaimHistory"
          />

          <span className="text-[#424B5A] text-sm font-normal leading-3">
            Танд одоогоор үүсгэсэн нөхөн төлбөрийн хүсэлт байхгүй байна.
          </span>
        </div>
      
      
      
      
      
      </>)}


    
    </>
  );
};

export default ReimbursementDetails;
