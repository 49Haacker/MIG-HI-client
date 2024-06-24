import { SetStateAction, useState } from "react";
import StepFirst from "./StepFirst";
import StepSecond from "./StepSecond";
import StepThird from "./StepThird";
import { ToastContainer, toast } from "react-toastify";

interface ReimbursementDataType {
  lastName?: string;
  firstName?: string;
  registerNo?: string;
  productName?: string;
  statusName?: string;
  rate?: number;
  invoiceAmount?: number;
}


const CompensationMaterials = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeContract, setActiveContract] = useState<ReimbursementDataType | null>([]);
  const [contract, setContractData] = useState<ReimbursementDataType | null>([]);
  const [price, setPrice] = useState<ReimbursementDataType | null>(null);
  const [stepThreeData, setStepThreeData] = useState<ReimbursementDataType | null>(null);

  const handleStepFirst = (value: SetStateAction<ReimbursementDataType | null>) => {
    setActiveContract(value);
  };
  const handleContractList = (value: SetStateAction<ReimbursementDataType | null>) => {
    setContractData(value);
  };

  const handleStepSecond = (value: SetStateAction<ReimbursementDataType | null> ) => {
    setPrice(value);
    setStepThreeData({
      step1: activeContract,
      contract:contract,
      step2: price,
      
    });
  };




  const handleNextStep = () => {
   
    if (currentStep === 1 && activeContract !== null) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 2 && activeContract !== null && price !== null) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };
  

 


  return (
    <>
      <div className="flex gap-8 flex-col justify-between w-full">
        {/* top tabs here */}
        <div className="flex gap-6 flex-col w-full">
          <div className="flex gap-4 items-start w-full">
            {/* step 1 */}
            <div className="flex flex-col gap-4 items-start w-1/2">
              <hr className={`bg-[#005F7E] w-full h-[4px]`} />
              <div className="flex gap-2 items-center">
                {(currentStep === 2 || currentStep === 3) && (
                  <img
                    src="/assets/customer/employee/completeTick.svg"
                    alt="copmleteTick"
                  />
                )}
                <span className="text-[#005F7E] font-normal leading-3">
                  Алхам 1
                </span>
              </div>
            </div>

            {/* step 2 */}
            <div className="flex flex-col gap-4 w-1/2">
              <hr
                className={`${
                  currentStep === 2 || currentStep === 3
                    ? "bg-[#005F7E]"
                    : "bg-[#E6EFF2]"
                } w-full h-[4px]`}
              />
              <div className="flex gap-2 items-center">
                {currentStep === 3 && (
                  <img
                    src="/assets/customer/employee/completeTick.svg"
                    alt="copmleteTick"
                  />
                )}
                <span className={`text-[#005F7E] font-normal leading-3`}>
                  Алхам 2
                </span>
              </div>
              {/* <span className="text-[#] font-normal leading-3"></span> */}
            </div>

            {/* step 3 */}
            <div className="flex flex-col gap-4 w-1/2">
              <hr
                className={`${
                  currentStep === 3 ? "bg-[#005F7E]" : "bg-[#E6EFF2]"
                } w-full h-[4px]`}
              />
              <div className="flex gap-2 items-center">
                {/* {currentStep === 3 && (
                  <img
                    src="/assets/employee/completeTick.svg"
                    alt="copmleteTick"
                  />
                )} */}
                <span className={`text-[#005F7E] font-normal leading-3`}>
                  Алхам 3
                </span>
              </div>
            </div>
          </div>

          {/* currentStep here */}
          <div className="flex w-full"> 
            {currentStep === 1 && <StepFirst firstStepData={handleStepFirst} handleContract={handleContractList}  />}
            {currentStep === 2 && <StepSecond secondStepData={handleStepSecond} />}
            {currentStep === 3 && <StepThird stepThreeData={stepThreeData} />}
          </div>
        </div>

        <div className="flex justify-end w-full">
          {currentStep < 3 && (
            <button
              onClick={handleNextStep}
              className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#004F6F] p-2 rounded-md"
            >
              Үргэлжлүүлэх
            </button>
          )}
        </div>
        <ToastContainer
            position="top-right" // Position in the top-right corner
            autoClose={3000} // Auto-close after 3 seconds
            hideProgressBar={false} // Show the progress bar
            newestOnTop={true} // Show new notifications on top
            closeOnClick // Close on click
            rtl={false} // Right-to-left or left-to-right
            pauseOnFocusLoss // Pause when the window loses focus
            draggable // Allow the toast to be dragged
            pauseOnHover // Pause when hovering over the toast
          />
      </div>
    </>
  );
};

export default CompensationMaterials;
