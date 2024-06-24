import  { SetStateAction, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const StepSecond = ({ secondStepData }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
    secondStepData(e.target.value);
  };

  return (
    <div className="flex flex-col w-full mt-8">
      <div className="flex gap-3 flex-col w-full sm:w-1/2">
        <Label className="text-[#424B5A]">Нэхэмжилж буй төлбөрийн дүн</Label>
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter payment amount"
          // Add any other props you need for the Input component
        />
      </div>
    </div>
  );
};

export default StepSecond;
