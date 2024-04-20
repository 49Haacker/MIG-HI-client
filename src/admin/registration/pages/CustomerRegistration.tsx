import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";

import CustomerRegStepFirst from "./CustomerRegStepFirst";
import CustomerRegStepSecond from "./CustomerRegStepSecond";
import { useState } from "react";

const CustomerRegistration = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>("Гараар бүртгэх");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    // console.log("selected valeu = ", value);
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-between w-full">
        <div className="flex flex-col w-full">
          <div className="flex">
            <RadioGroup defaultValue="Гараар бүртгэх" className="flex gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="r1"
                  value="Гараар бүртгэх"
                  onClick={() => handleRadioChange("Гараар бүртгэх")}
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Гараар бүртгэх
                </Label>
                {/* Register manually */}
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="r2"
                  value="Excel-ээр бүртгэх"
                  onClick={() => handleRadioChange("Excel-ээр бүртгэх")}
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  Excel-ээр бүртгэх
                </Label>
                {/* Record in Excel */}
              </div>
            </RadioGroup>
          </div>

          <div className="flex w-full">
            {selectedOption === "Гараар бүртгэх" && <CustomerRegStepFirst />}
            {selectedOption === "Excel-ээр бүртгэх" && (
              <CustomerRegStepSecond />
            )}
          </div>
        </div>

        {/* Add button */}
        <div className="w-full flex justify-end">
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
