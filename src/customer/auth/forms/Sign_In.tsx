import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Sign_In = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-[#FFFFFF] rounded-2xl p-4 w-3/4 lg:w-1/2">
          {/* Login */}
          <h1 className="text-[#195563] leading-[30.05px] font-bold text-[24px]">
            Нэвтрэх
          </h1>

          {/* Phone number */}
          <div className="flex gap-2 flex-col my-12">
            <Label className="font-normal text-[#424B5A] text-[14px] leading-[17.36px]">
              Утасны дугаар
            </Label>
            <Input
              placeholder="+(976) 0000-0000"
              className="placeholder:text-[#B3CFD8] text-[#424B5A] font-normal text-[14px] leading-[17.36px]"
            />
          </div>

          <div className="flex items-center w-full mt-4">
            <Button
              onClick={() => navigate("/verify-otp")}
              className="text-[#FFFFFF] bg-[#005F7E] hover:bg-[#006F8F] font-bold text-[16px] leading-[20.03px] w-full text-center"
            >
              Нэвтрэх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_In;
