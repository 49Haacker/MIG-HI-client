import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileSaveData from "@/customer/model/ProfileSaveData";

const Profile = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start gap-8 w-full">
          <div className="flex flex-col w-full">
            {/* This */}
            <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
              Овог
            </h1>
            <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
              Цогтбаатар
              {/* License */}
            </Button>
          </div>

          <div className="flex flex-col w-full">
            {/* Name */}
            <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
              Нэр
            </h1>
            <Button className="bg-[#4D8FA5] hover:bg-[#4d8fa5ed] text-[#FFFFFF] text-[14px] leading-[14px] flex justify-start">
              Энхжавхлан
              {/* Enkhjavkhlan */}
            </Button>
          </div>

          <div className="flex flex-col w-full">
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

        <div className="flex flex-col gap-4 mt-12">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              {/* Identity card (front side) */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Иргэний үнэмлэх (урд тал)
              </h1>
              <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="relative flex justify-center items-center">
                  <img
                    src="/assets/customer/profile/identityFront.svg"
                    alt="identityFront"
                  />

                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Identity card (back) */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Иргэний үнэмлэх (ар тал)
              </h1>
              <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="relative flex justify-center items-center">
                  <img
                    src="/assets/customer/profile/identityBack.svg"
                    alt="identityBack"
                  />

                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Driving license (front side) */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Жолоооны үнэмлэх (урд тал)
              </h1>
              <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="relative flex justify-center items-center">
                  <img
                    src="/assets/customer/profile/drivingFront.svg"
                    alt="drivingFront"
                  />

                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Driving license (back side) */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Жолоооны үнэмлэх (ар тал тал)
              </h1>
              <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="relative flex justify-center items-center">
                  <img
                    src="/assets/customer/profile/drivingBack.svg"
                    alt="drivingBack"
                  />

                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              {/* Vehicle certificate */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Тээврийн хэрэгслийн гэрчилгээ
              </h1>
              <div className="bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="relative flex justify-center items-center">
                  <img
                    src="/assets/customer/profile/vehicleCerti.svg"
                    alt="vehicleCerti"
                  />

                  <img
                    src="/assets/customer/profile/editIcon.svg"
                    alt="editIcon"
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* Excel data entry */}
              <h1 className="text-[#424B5A] font-normal text-[14px] leading-[17.36px]">
                Excel мэдээлэл оруулах
              </h1>
              <div className="flex items-center justify-center relative bg-[#E6EFF2] p-2 rounded-lg w-[199px] h-[137px]">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="/assets/customer/profile/excelDataEntry.svg"
                    alt="excelDataEntry"
                  />

                  <h1>excel.xlsx</h1>
                </div>
                <img
                  src="/assets/customer/profile/editIcon.svg"
                  alt="editIcon"
                  className="absolute right-2 top-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full">
            {/* <Button
              onClick={openModal}
              className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px]"
            >
              Хадгалах
            </Button>
            Save */}

            <ProfileSaveData />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
