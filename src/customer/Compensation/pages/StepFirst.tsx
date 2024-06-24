import { Label } from "@/components/ui/label";
import * as React from "react";
import axios from "@/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FullPageLoader from "@/components/ui/FullPageLoader";

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
  LastName: string;
  FirstName: string;
  ContractDetailId: string;
  ContractId: string;
  ContractTypeId: string;
  PayAmount: string;
  ProductCode: string;
  ProductID: string;
}


interface StepFirstProps {
  firstStepData: (value: string) => void; // Assuming firstStepData takes a string parameter
}

const StepFirst: React.FC<StepFirstProps>  = ({firstStepData ,handleContract }) => {
  const [insuranceData, setInsuranceData] = React.useState<EmployeeData[]>([]);
  const [registerNumber, setRegisterNumber] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  React.useEffect(() => {
    setLoading(true); // Ensure loading is true before fetching
    axios
      .get("current-customer")
      .then((response) => {
        setRegisterNumber(response.data.customer.RegisterNo);
        setLoading(false);
        console.info(error);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // No dependencies, this effect runs only once on component mount

  React.useEffect(() => {
    if (registerNumber) {
      // Ensure registerNumber is not empty or undefined
      setLoading(true); // Set loading before fetching
      axios
        .get(`Guarantee/List?RegisterNo=${registerNumber}`)
        // .get(`Guarantee/List?RegisterNo=НМ66040816`)
        .then((response) => {
          const filteredData = response.data.filter(
            (item: { ProductID: string }) => item.ProductID == "1807060001"
          );
          setInsuranceData(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [registerNumber]);

  const handleChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value;
    setInputValue(value);
    firstStepData(value);  
  }
  const handleOptionchange = (selectedOption: any) => {
    // Assuming selectedOption is directly passed as an object
    const parsedOption = JSON.parse(selectedOption);
    console.log(parsedOption);
    handleContract(parsedOption);
  }

  
  return (
    <>
      <div className="flex gap-2 flex-col sm:flex-row w-full">
        <FullPageLoader isLoading={loading} />

        <div className="w-full sm:w-1/2">
          <Label className="text-[#424B5A]">Идэвхитэй гэрээнээс сонгох</Label>
          <Select
            onValueChange={handleOptionchange}
          >
            <SelectTrigger className="focus:ring-1 flex items-center justify-between focus:ring-[#B3CFD8] focus:ring-offset-[#B3CFD8]">
              <SelectValue placeholder="Даатгал сонгох" />
            </SelectTrigger>
            <SelectContent>
              {insuranceData.map((option, index) => (
                <SelectItem key={index} value={JSON.stringify(option)}>
                  {option.ProductName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <Label className="text-[#424B5A]">
            Нөхөн төлбөрийн тохиолдлын товч агуулга
          </Label>
          <Textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="мессежээ энд бичнэ үү"
            className="focus:ring-1 focus:ring-[#B3CFD8] focus:ring-offset-[#B3CFD8]"
          />
        </div>
      </div>
    </>
  );
};

export default StepFirst;
