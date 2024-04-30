import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const CancelContract = () => {
  const handleBack = () => {
    console.log("handle back was click");
  };

  const handleCancel = () => {
    console.log("handle cancel was click");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-background hover:bg-background text-[#FF5C5E] hover:text-[#FF5C5E] font-bold text-[18px] leading-[23.18px] border border-[#FF5C5E] rounded-full mb-4"
          >
            Гэрээ цуцлах
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          {/* Change phone number */}
          <DialogHeader className="flex justify-center items-center gap-8">
            <img
              src="/assets/customer/models/cancelContract.svg"
              alt="cancelContract"
              width={78}
              height={78}
            />
            <DialogDescription className="font-semibold text-[#424B5A] text-[14px] leading-[20px]">
              Та гэрээг цуцлахдаа итгэлтэй байна уу?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center items-center gap-8 w-full">
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-background hover:bg-[#FF5C5E] text-[#424B5A] hover:text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
                onClick={handleBack}
              >
                Буцах
                {/* Go back */}
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-[#FF5C5E] hover:bg-[#FF5C5E] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
                onClick={handleCancel}
              >
                Тийм
                {/* Yes */}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelContract;
