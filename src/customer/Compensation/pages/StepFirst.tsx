import { Label } from "@/components/ui/label";
import * as React from "react";
import axios from '@/axios'
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
  LastName: string,
  FirstName: string,
  ContractDetailId: string,
  ContractId: string,
  ContractTypeId: string,
  PayAmount: string,
  ProductCode: string,
  ProductID: string
}

const StepFirst = () => {


const [insuranceData, setInsuranceData] = React.useState<EmployeeData[]>([]);
  const [registerNumber , setRegisterNumber] = React.useState<string | null>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {

    setLoading(true); // Ensure loading is true before fetching
    axios.get('current-customer')
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
    if (registerNumber) { // Ensure registerNumber is not empty or undefined
      setLoading(true); // Set loading before fetching
      axios
        .get(`Guarantee/List?RegisterNo=${registerNumber}`)
        // .get(`Guarantee/List?RegisterNo=НМ66040816`)
        .then((response) => {
          console.info('Axios response', response.data);
          setInsuranceData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [registerNumber]); 

  
  return (
    <>
      <div className="flex gap-2 flex-col sm:flex-row w-full">
      <FullPageLoader isLoading={loading} />

        <div className="w-full sm:w-1/2">
          
          <Label className="text-[#424B5A]">Идэвхитэй гэрээнээс сонгох</Label>
          <Select>
            <SelectTrigger className="focus:ring-1 flex items-center justify-between focus:ring-[#B3CFD8] focus:ring-offset-[#B3CFD8]">
              <SelectValue placeholder="Select insurance" />
            </SelectTrigger>
            <SelectContent>
              {insuranceData.map((option,index) => (
                <SelectItem key={index} value={index.toString()}>
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
            placeholder="Type your message here."
            className="focus:ring-1 focus:ring-[#B3CFD8] focus:ring-offset-[#B3CFD8]"
          />
        </div>
      </div>
    </>
  );
};

export default StepFirst;
