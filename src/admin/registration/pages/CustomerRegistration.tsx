import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <div className="flex flex-col gap-4 w-full">
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

        <div
          className={`flex w-full`}
          style={
            selectedOption === "Excel-ээр бүртгэх"
              ? { height: "-webkit-fill-available" }
              : {}
          }
        >
          {selectedOption === "Гараар бүртгэх" && <CustomerRegStepFirst />}
          {selectedOption === "Excel-ээр бүртгэх" && <CustomerRegStepSecond />}
        </div>
      </div>
    </>
  );
};

export default CustomerRegistration;
