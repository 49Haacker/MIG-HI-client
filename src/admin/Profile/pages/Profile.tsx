import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col sm:flex-row items-start gap-8 w-full">
            <div className="flex flex-col w-full gap-2">
              {/* This */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Овог
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                Цогтбаатар
                {/* License */}
              </Button>
            </div>

            <div className="flex flex-col w-full gap-2">
              {/* Name */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Нэр
              </h1>
              <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                Энхжавхлан
                {/* Enkhjavkhlan */}
              </Button>
            </div>

            <div className="flex flex-col w-full gap-2">
              {/* Register number */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Регистрийн дугаар
              </h1>
              <div className="flex gap-4 w-full">
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                  A
                </Button>
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
                  A
                </Button>
                <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start w-full">
                  12345678
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 relative">
            {/* Phone number */}
            <Label>Утасны дугаар</Label>
            <div className="relative flex">
              <Input placeholder="99990000" className="w-full absolute" />

              <img
                src="/assets/customer/profile/editIcon.svg"
                alt="editIcon"
                className="absolute right-2 top-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-12">
          <div className="flex justify-end w-full">
            <Button className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]">
              Хадгалах
            </Button>
            {/* Save */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
