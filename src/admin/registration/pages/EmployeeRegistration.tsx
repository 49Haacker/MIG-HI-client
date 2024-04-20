import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmployeeRegistration = () => {
  return (
    <>
      <div className="flex flex-col gap-4 items-start justify-between w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                Овог
              </Label>
              <Input
                placeholder="Овог оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[17.36px]">
                Нэр
              </Label>
              <Input
                placeholder="Нэр оруулах..."
                className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor=""
                className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
              >
                Регистрийн дугаар
              </Label>

              <div className="flex gap-8 w-full">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                      >
                        P
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          A
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          Б
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          B
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          Г
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                      >
                        Д
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          A
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          Б
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          B
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#B3CFD8] font-medium text-[14px] leading-[14px]">
                          Г
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex w-full">
                    <Input
                      placeholder="Дугаар"
                      className="text-[#B3CFD8] font-medium text-[14px] leading-[14px] placeholder:text-[#B3CFD8]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-[33%] mt-4">
            <Label className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
              Утасны дугаар
            </Label>
            <Input
              placeholder="Утасны дугаар оруулах..."
              className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
            />
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

export default EmployeeRegistration;
