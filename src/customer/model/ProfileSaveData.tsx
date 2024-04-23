import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ProfileSaveDataProps {
  number: string;
  onPhoneNumberChange: (newPhoneNumber: string) => void;
}

const ProfileSaveData: React.FC<ProfileSaveDataProps> = ({
  number,
  onPhoneNumberChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(number);

  const handleSave = () => {
    // console.log(phoneNumber);
    onPhoneNumberChange(phoneNumber);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/* variant="outline" */}
          <img
            src="/assets/customer/profile/editIcon.svg"
            alt="editIcon"
            className="absolute right-2 top-2 cursor-pointer"
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          {/* Change phone number */}
          <DialogHeader>
            <DialogTitle className="font-medium text-[#195563] text-[30px] leading-[30.91px]">
              Утасны дугаар өөрчлөх
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 my-4">
            <Input
              id="name"
              className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end items-center">
            {/* Save */}
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
                onClick={handleSave}
                disabled={phoneNumber.length < 8}
              >
                Хадгалах
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSaveData;
