import React, { useEffect  } from 'react';
import { useUserContext } from '@/admin/Context/UserData';
import { Button } from "@/components/ui/button";
import pdfIcon from "@/assets/eclaim/pdf.png";
import wordIcon from "@/assets/eclaim/word.png";
import { useNavigate } from 'react-router-dom';

const AdminCustomerDetails: React.FC = () => {
  const { data } = useUserContext();
  const navigate  = useNavigate();
  useEffect(() => {
    checkData();
    
  }, [data]);

  const checkData = () => {
    if(data.length <= 0){
      return navigate('/admin/registration/list');
    }
  }

 
  const getFileIconOrUrl = (url: string | undefined | null): string => {
    if (!url) {
      return "/assets/customer/employee/uploadIcon.svg"; // Default icon if URL is undefined or null
    }
  
    const lowerCaseUrl = url.toLowerCase();
    
    if (lowerCaseUrl.endsWith('.pdf')) {
      return pdfIcon // Replace with actual path to your PDF icon
    } else if (lowerCaseUrl.endsWith('.doc') || lowerCaseUrl.endsWith('.docx')) {
      return wordIcon; // Replace with actual path to your Word document icon
    } else if (lowerCaseUrl.endsWith('.jpg') || lowerCaseUrl.endsWith('.jpeg') || lowerCaseUrl.endsWith('.png') || lowerCaseUrl.endsWith('.gif')) {
      return url; // Return the image URL directly
    }
  
    return "/assets/customer/employee/uploadIcon.svg"; // Default icon if file type is not recognized
  };
  

  return (
    <>
      <div className='flex flex-col'>
      {data.map((user, index) => (
        <div key={index} className="flex flex-col items-start gap-4 w-full">
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
                  Утасны дугаар
                </span>
              </div>

              <div className="flex flex-col gap-5 px-6 py-8 rounded-md">
                <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                  {user.LastName}
                </span>
                <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                  {user.Name}
                </span>
                <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                  {user.RegisterNumber}
                </span>
                <span className="text-[#424B5A] font-medium text-[14px] leading-[14px]">
                  {user.PhoneNo}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                {user.VehicleCertificate && user.VehicleCertificate !== "" && (
                  <>  
                    <div className="w-full">
                      <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                        Иргэний үнэмлэх (урд тал) {/* Identity Card Front Side */}
                      </h1>
                      <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                        <a href={user.VehicleCertificate} download>
                          <img
                            src={getFileIconOrUrl(user.VehicleCertificate)}
                            className='h-[90px]'
                            alt="Identity Card Front Side "
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {user.IdentitybackCertificate && user.IdentitybackCertificate !== "" && (
                  <>  
                    <div className="w-full">
                      <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                          Иргэний үнэмлэх (ар тал) {/* Identity Card Back Side */}
                      </h1>
                      <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                        <a href={user.IdentitybackCertificate} download>
                          <img
                            src={getFileIconOrUrl(user.IdentitybackCertificate)}
                            className='h-[90px]'
                            alt="Identity Card Back Side "
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col xl:flex-row gap-4 w-full">
                {user.SteeringWheelCertificate && user.SteeringWheelCertificate !== "" && (
                  <>  
                    <div className="w-full">
                      <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                        Жолооны үнэмлэх (урд тал)  {/* Drive Licence Frontend Side */}
                      </h1>
                      <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                        <a href={user.SteeringWheelCertificate} download>
                          <img
                            src={getFileIconOrUrl(user.SteeringWheelCertificate)}
                            className='h-[90px]'
                            alt="Steering Wheel Certificate "
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}
                {user.DrivingLinceseback && user.DrivingLinceseback !== "" && (
                  <>  
                    <div className="w-full">
                      <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                        Жолооны үнэмлэх (ар тал)  {/* Drive Licence Backend Side */}
                      </h1>
                      <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                        <a href={user.DrivingLinceseback} download>
                          <img
                            src={getFileIconOrUrl(user.DrivingLinceseback)}
                            className='h-[90px]'
                            alt="Driving Licence Back Side "
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 w-full">
                {user.CivilWarCertificate && user.CivilWarCertificate !== "" && (
                  <>  
                    <div className="w-full xl:w-1/2">
                      <h1 className="text-[#424B5A] font-normal text-[14px] leading-[18.03px]">
                        Иргэний үнэмлэх (урд тал)  {/* Civil War Certificate */} 
                      </h1>
                      <div className="flex justify-center items-center p-3 rounded-lg bg-[#E6EFF2]">
                        <a href={user.CivilWarCertificate} download>
                          <img
                            src={getFileIconOrUrl(user.CivilWarCertificate)}
                            className='h-[90px]'
                            alt="Civil War Certificate"
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <br></br>
      <div>
        <Button className="bg-inherit hover:bg-inherit border border-[#00A27B] text-[#00A27B] font-bold text-[18px] leading-[23.18px] rounded-full">
          Хадгалах
        </Button>
      </div>
      </div>
    </>
  );
};

export default AdminCustomerDetails;
