import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";

import CustomerRegStepFirst from "./CustomerRegStepFirst";
import CustomerRegStepSecond from "./CustomerRegStepSecond";
import { useState } from "react";

const CustomerRegistration = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col w-full">
          <div className="flex">
            <RadioGroup defaultValue="Гараар бүртгэх" className="flex gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Гараар бүртгэх"
                  id="r1"
                  checked={currentStep === 1}
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Гараар бүртгэх
                </Label>
                {/* Register manually */}
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Excel-ээр бүртгэх"
                  id="r2"
                  checked={currentStep === 2}
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  Excel-ээр бүртгэх
                </Label>
                {/* Record in Excel */}
              </div>
            </RadioGroup>
          </div>

          <div className="flex w-full">
            {currentStep === 1 && <CustomerRegStepFirst />}
            {currentStep === 2 && <CustomerRegStepSecond />}
          </div>
        </div>

        {/* Add button */}
        <div onClick={handleNextStep} className="w-full flex justify-end">
          <Button
            type="submit"
            className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
          >
            Нэмэх
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerRegistration;
