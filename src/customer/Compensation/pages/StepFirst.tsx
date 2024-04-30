import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const StepFirst = () => {
  return (
    <>
      <div className="flex gap-2 flex-col sm:flex-row w-full">
        <div className="w-full sm:w-1/2">
          <Label className="text-[#424B5A]">Идэвхитэй гэрээнээс сонгох</Label>
          <Select>
            <SelectTrigger className="focus:ring-1 focus:ring-[#B3CFD8] focus:ring-offset-[#B3CFD8]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
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
