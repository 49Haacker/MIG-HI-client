import { useState } from "react";
import { StepFirst } from ".";
import StepSecond from "./StepSecond";
import StepThird from "./StepThird";

const CompensationMaterials = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
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
            {currentStep === 1 && <StepFirst />}
            {currentStep === 2 && <StepSecond />}
            {currentStep === 3 && <StepThird />}
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
      </div>
    </>
  );
};

export default CompensationMaterials;
