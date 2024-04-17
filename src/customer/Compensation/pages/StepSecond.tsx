import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StepSecond = () => {
  return (
    <>
      <div className="flex flex-col w-full mt-8">
        <div className="flex gap-3 flex-col w-full sm:w-1/2">
          <Label className="text-[#424B5A]">Нэхэмжилж буй төлбөрийн дүн</Label>

          <Input />
        </div>
      </div>
    </>
  );
};

export default StepSecond;
