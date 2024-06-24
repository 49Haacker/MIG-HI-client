import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";
import axios from "@/axios";

import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FullPageLoader from "./../../../components/ui/FullPageLoader";

import pdfIcon from "../../../assets/eclaim/pdf.png";
import wordIcon from "../../../assets/eclaim/word.png";

import { useNavigate } from "react-router-dom";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "@/admin/Context/UserData";

const formSchema = z.object({
  lastName: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  RegisterNo: z.string().min(8, {
    message: "Register number must be at least 8 characters.",
  }),
  phoneNumber: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
});

interface FormData {
  civilCode: File | null;
  identityCard: File | null;
  vehicleCertificate: File | null;
  drivingFront: File | null;
  drivingBack: File | null;
}



const CustomerAndEmployeeEdit = () => {

  const { data } = useUserContext();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (!data || data.length <= 0) {
      navigate('/admin/registration/list');
    } else {
      setIsChecked(data[0]?.IsForigner === '0'); 
    }
  }, [data]);



  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data && data.length > 0 ? {
      lastName: data[0].LastName,
      name: data[0].Name,
      RegisterNo:   data[0].IsForigner === '0' ? data[0].RegisterNumber.slice(2) : data[0].RegisterNumber,
      phoneNumber: data[0].PhoneNo,
    } : {
      lastName: '',
      name: '',
      RegisterNo: '',
      phoneNumber: '',
    },
  });


 

  const [isLoading, setIsLoading] = useState(false);
  const civilCodeRef = useRef<HTMLInputElement>(null);
  const identityCardRef = useRef<HTMLInputElement>(null);
  const vehicleCertificateRef = useRef<HTMLInputElement>(null);
  const drivingFrontRef = useRef<HTMLInputElement>(null);
  const drivingBackRef = useRef<HTMLInputElement>(null);
  const [error] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    civilCode: null,
    identityCard: null,
    vehicleCertificate: null,
    drivingFront: null,
    drivingBack: null,
  });

  const alphabet = ["А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","Ө","П","Р","С","Т","У","Ү","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"];

  const handleDelete = (
    fieldName: string,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: null,
    }));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const [selectedLater1, setSelectedLater1] = useState<string>( data.length > 0 ? data[0].RegisterNumber.slice(0, 1) : "А");
  const [selectedLater2, setSelectedLater2] = useState<string>(data.length > 0 ? data[0].RegisterNumber.slice(1, 2) : "Ц");
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  const handleLaterSelect1 = (later: string) => {
    setSelectedLater1(later);
    setIsOpen1(false);
  };
  const handleLaterSelect2 = (later: string) => {
    setSelectedLater2(later);
    setIsOpen2(false);
  };

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
    if (isOpen2) {
      setIsOpen2(false);
    }
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    if (isOpen1) {
      setIsOpen1(false);
    }
  };

  const handleImageClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getPreviewImg = (file: File | null) => {
    if (file) {
      const fileType = file.type;

      if (fileType.startsWith("image/")) {
        return URL.createObjectURL(file);
      } else if (fileType === "application/pdf") {
        return pdfIcon; // Assuming pdfIcon is a valid URL or imported image
      } else if (
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return wordIcon; // Assuming wordIcon is a valid URL or imported image
      } else {
        return null; // Return null for unsupported file types
      }
    }

    return null; // Return null if file is null or undefined
  };

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageKey: keyof typeof formData
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [imageKey]: file,
      }));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (
      !values.lastName &&
      !values.name &&
      !values.phoneNumber &&
      !values.RegisterNo
    ) {
      return setIsLoading(false);
    }
    let RegisterNumber;

    if (!isChecked) {
      RegisterNumber = values.RegisterNo.slice(0, 8);
    } else {
      RegisterNumber =
        selectedLater1 + selectedLater2 + values.RegisterNo.slice(0, 8);
    }

    const data1 = new FormData();
    data1.append("LastName", values.lastName.toUpperCase());
    data1.append("FirstName", values.name.toUpperCase());
    data1.append("PhoneNo", values.phoneNumber);
    data1.append("RegisterNo", RegisterNumber.toUpperCase());
    data1.append("IsForigner", isChecked ? "0" : "1");

    if(data[0].UserTypeText == 'User'){
      data1.append("userType", '0');
    }

    if(data[0].UserTypeText == 'Manager'){
      data1.append("userType", '1');
    }


    // Map frontend image keys to backend keys
    const imageKeyMap: Record<string, string> = {
      civilCode: "CivilWarCertificate",
      identityCard: "IdentitybackCertificate",
      vehicleCertificate: "VehicleCertificate",
      drivingFront: "SteeringWheelCertificate",
      drivingBack: "DrivingLinceseback",
    };

    // Append mapped images to FormData
    Object.entries(formData).forEach(([key, value]) => {
      const backendKey = imageKeyMap[key];
      if (backendKey && value !== null) {
        data1.append(backendKey, value);
      }
    });

    axios
      .post(`customers-edit-profile?PhoneNo=${data[0].PhoneNo}`, data1)
      .then((response) => {
        console.log("Success:", response.data);
        setIsLoading(false);
        toast.success(response.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.errors[0].msg);
      });

    // console.log("form was submited");
  };

  const getFileIconOrUrl = (url: string | undefined | null): string => {
    if (!url) {
      return "/assets/customer/employee/uploadIcon.svg"; // Default icon if URL is undefined or null
    }
  
    const lowerCaseUrl = url.toLowerCase();
    
    if (lowerCaseUrl.endsWith('.pdf')) {
      return pdfIcon // Replace with actual path to your PDF icon
    } else if (lowerCaseUrl.endsWith('.doc') || lowerCaseUrl.endsWith('.docx')) {
      return wordIcon; // Replace with actual path to your Word document icon
    } else if (lowerCaseUrl.endsWith('.jpg') || lowerCaseUrl.endsWith('.jpeg') || lowerCaseUrl.endsWith('.png') || lowerCaseUrl.endsWith('.gif')) {
      return url; // Return the image URL directly
    }
  
    return "/assets/customer/employee/uploadIcon.svg"; // Default icon if file type is not recognized
  };
  

 

  return (
    <>
    {data.length > 0 ?(<>
      <div className="flex flex-col justify-between w-full">
        <FullPageLoader isLoading={isLoading} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start w-full"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row gap-4 w-full ">
                  <div className="flex flex-col gap-2 w-full">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                            Овог <span className="text-[red]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Овог оруулах..."
                              {...field}
                              className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                            Нэр <span className="text-[red]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Нэр оруулах..."
                              {...field}
                              className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                            Утасны дугаар <span className="text-[red]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Утасны дугаар оруулах..."
                              {...field}
                              className="text-[#424B5A] placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <Label
                    htmlFor=""
                    className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
                  >
                    Регистрийн дугаар <span className="text-[red]">*</span>
                  </Label>

                  <div className="flex flex-col sm:flex-row gap-8 w-full">
                    {/* dropdown and input box */}
                    <div className="flex gap-2">
                      {/* first dropdown */}
                      {isChecked && (
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8] shadow-sm bg-white px-4 py-2 text-sm font-medium text-[#B3CFD8] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                              id="options-menu"
                              onClick={toggleDropdown1}
                            >
                              {selectedLater1 ? selectedLater1 : "P"}
                            </button>
                          </div>

                          {isOpen1 && (
                            <div
                              className="origin-top-right absolute z-[999999] left-0 mt-2 w-[22rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-100 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div className="p-4   " role="none">
                                <div className="grid grid-cols-5 gap-2  ">
                                  {alphabet.map((letter) => (
                                    <button
                                      key={letter}
                                      onClick={() => handleLaterSelect1(letter)}
                                      className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8]  border-opacity-40 shadow-sm bg-white px-5 py-2 text-sm font-medium text-[#424B5A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                                    >
                                      {letter}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  className="inline-flex mt-4   justify-center  rounded-md border border-[#B3CFD8] border-opacity-40 shadow-sm bg-white w-[100%]  px-4 py-2 text-sm font-medium text-[#424B5A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                                  onClick={() => {
                                    setIsOpen1(false);
                                  }}
                                >
                                  Xaax
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* second dropdown */}
                      {isChecked && (
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8] shadow-sm bg-white px-4 py-2 text-sm font-medium text-[#B3CFD8] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                              id="options-menu"
                              onClick={toggleDropdown2}
                            >
                              {selectedLater2 ? selectedLater2 : "Д"}
                            </button>
                          </div>

                          {isOpen2 && (
                            <div
                              className="origin-top-right  z-[999999] absolute left-0 mt-2 w-[22rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-100 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div className="p-4  " role="none">
                                <div className="grid grid-cols-5 gap-2  ">
                                  {alphabet.map((letter) => (
                                    <button
                                      key={letter}
                                      onClick={() => handleLaterSelect2(letter)}
                                      className="inline-flex justify-center w-full rounded-md border border-[#B3CFD8]  border-opacity-40 shadow-sm bg-white px-5 py-2 text-sm font-medium text-[#424B5A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                                    >
                                      {letter}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  className="inline-flex mt-4   justify-center  rounded-md border border-[#B3CFD8] border-opacity-40 shadow-sm bg-white w-[100%]  px-4 py-2 text-sm font-medium text-[#424B5A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-[B3CFD8] focus:ring-[#B3CFD8]"
                                  onClick={() => {
                                    setIsOpen2(false);
                                  }}
                                >
                                  Xaax
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex w-full">
                        <FormField
                          control={form.control}
                          name="RegisterNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Дугаар"
                                  {...field}
                                  maxLength={8}
                                  className="text-[#424B5A] uppercase	  placeholder:text-[#B3CFD8] font-medium text-[14px] leading-[14px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div
                      className="flex items-center space-x-2"
                      onClick={toggleCheckbox}
                    >
                      <img
                        src={
                          isChecked
                            ? "/assets/admin/registration/unChecked.svg"
                            : "/assets/admin/registration/checked.svg"
                        }
                        alt={isChecked ? "checked" : "unChecked"}
                        className="cursor-pointer"
                      />

                      <label
                        htmlFor="terms"
                        className="text-[#424B5A] text-[14px] font-medium leading-[17.36px] cursor-pointer"
                      >
                        Гадаадын иргэн эсэх
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Civil Code, Identity Card, photo of vehicle */}
              <div className="w-full flex flex-col gap-2 my-3">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
                  {/* Civil Code (front) */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" relative flex justify-between p-2 pt-0 pb-0 ">
                      <span className="text-sm text-[#424B5A]">
                        Иргэний үнэмл (урд тал)
                      </span>

                      {formData.civilCode ? (
                        <button
                          className="absolute top-1 z-[999] right-[10px]"
                          onClick={() =>
                            handleDelete("civilCode", civilCodeRef)
                          }
                        >
                          {" "}
                          <FaTrashAlt style={{ color: "red" }} />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                      onClick={() => handleImageClick(civilCodeRef)}
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="civilCode" className="cursor-pointer">
                        {data[0].CivilWarCertificate != '' ? (
                          <img
                            src={ !formData.civilCode ?   getFileIconOrUrl(data[0].CivilWarCertificate) : getPreviewImg(formData.civilCode) }
                            alt="Civil Code"
                            className="object-contain w-[200px] h-[100px]"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <>
                            <img
                              src={data[0].CivilWarCertificate}
                              alt="uploadIcon"
                              className="absolute inset-0 m-auto"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </>
                        )}
                        <input
                          id="civilCode"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          ref={civilCodeRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, "civilCode")}
                        />
                      </label>
                      {data[0].CivilWarCertificate != '' || formData.civilCode ? (
                        " "
                      ) : (
                        <span className="text-xs text-[#005F7E] absolute bottom-4">
                          Хуулах
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Identity card (back) */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" relative flex justify-between p-2 pt-0 pb-0 ">
                      <span className="text-sm text-[#424B5A]">
                        Иргэний үнэмлэх (ар тал)
                      </span>

                      {formData.identityCard ? (
                        <button
                          className="absolute top-1 z-[999] right-[10px]"
                          onClick={() =>
                            handleDelete("identityCard", identityCardRef)
                          }
                        >
                          {" "}
                          <FaTrashAlt style={{ color: "red" }} />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                      onClick={() => handleImageClick(identityCardRef)}
                      style={{ position: "relative" }}
                    >
                      <label
                        htmlFor="Identity card (back)"
                        className="cursor-pointer"
                      >
                        
                        {data[0].IdentitybackCertificate !== '' ? (
                          <>
                            <img
                              src={ !formData.identityCard ?  getFileIconOrUrl(data[0].IdentitybackCertificate) : getPreviewImg(formData.identityCard) }
                              alt="Identity card (back)"
                              className=" object-contain   w-[200px] h-[100px]  "
                              onClick={(e) => e.stopPropagation()}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="/assets/customer/employee/uploadIcon.svg"
                              alt="uploadIcon"
                              className="absolute inset-0 m-auto"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </>
                        )}
                        <input
                          id="identityCard"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          ref={identityCardRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, "identityCard")}
                        />
                      </label>

                      {data[0].CivilWarCertificate != '' || formData.civilCode ? (
                        " "
                      ) : (
                        <span className="text-xs text-[#005F7E] absolute bottom-4">
                          Хуулах
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Photo of vehicle certificate */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className=" relative flex justify-between p-2 pt-0 pb-0 ">
                      <span className="text-sm text-[#424B5A]">
                        Тээврийн хэрэгслийн гэрчилгээний зураг
                      </span>
                      {formData.vehicleCertificate ? (
                        <button
                          className="absolute top-1 z-[999] right-[10px]"
                          onClick={() =>
                            handleDelete(
                              "vehicleCertificate",
                              vehicleCertificateRef
                            )
                          }
                        >
                          {" "}
                          <FaTrashAlt style={{ color: "red" }} />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                      onClick={() => handleImageClick(vehicleCertificateRef)}
                      style={{ position: "relative" }} // Add position relative to container
                    >
                      <label
                        htmlFor="vehicleCertificate"
                        className="cursor-pointer"
                      >
                        {data[0].VehicleCertificate != ''? (
                          <img
                            src={ !formData.vehicleCertificate ?  getFileIconOrUrl(data[0].VehicleCertificate) : getPreviewImg(formData.vehicleCertificate) }
                            alt="vehicleCertificate"
                            className=" object-contain  w-[200px] h-[100px]  "
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <img
                            src="/assets/customer/employee/uploadIcon.svg"
                            alt="uploadIcon"
                            className="absolute inset-0 m-auto"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}

                        <input
                          id="vehicleCertificate"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          ref={vehicleCertificateRef}
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileChange(e, "vehicleCertificate")
                          }
                        />
                      </label>
                      {data[0].VehicleCertificate != '' ? (
                        ""
                      ) : (
                        <span className="text-xs text-[#005F7E] absolute bottom-4">
                          Хуулах
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
                  <div className="flex flex-col gap-2">
                    <div className=" relative flex justify-between p-2 pt-0 pb-0 ">
                      <span className="text-sm text-[#424B5A]">
                        Жолоооны үнэмлэхний зураг (урд тал)
                      </span>
                      {formData.drivingFront ? (
                        <button
                          className="absolute top-1 z-[999] right-[10px]"
                          onClick={() =>
                            handleDelete("drivingFront", drivingFrontRef)
                          }
                        >
                          {" "}
                          <FaTrashAlt style={{ color: "red" }} />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                      onClick={() => handleImageClick(drivingFrontRef)}
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="drivingFront" className="cursor-pointer">
                        {data[0].SteeringWheelCertificate != ''? (
                          <img
                            src={ !formData.drivingFront ?  getFileIconOrUrl(data[0].SteeringWheelCertificate) : getPreviewImg(formData.drivingFront) }
                            alt="drivingFront"
                            className="object-contain  w-[200px] h-[100px]  "
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <img
                          src="/assets/customer/employee/uploadIcon.svg"
                          alt="uploadIcon"
                          className="absolute  inset-0 m-auto"
                          onClick={(e) => e.stopPropagation()}
                        />
                        )}
                        <input
                          id="drivingFront"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          ref={drivingFrontRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, "drivingFront")}
                        />
                      </label>
                      {data[0].SteeringWheelCertificate != '' ? (
                        ""
                      ) : (
                        <span className="text-xs text-[#005F7E] absolute bottom-4">
                          Хуулах
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className=" relative flex justify-between p-2 pt-0 pb-0 ">
                      <span className="text-sm text-[#424B5A]">
                        Жолоооны үнэмлэхний зураг (ар тал)
                      </span>

                      {formData.drivingBack ? (
                        <button
                          className="absolute top-1 z-[999] right-[10px]"
                          onClick={() =>
                            handleDelete("drivingBack", drivingBackRef)
                          }
                        >
                          {" "}
                          <FaTrashAlt style={{ color: "red" }} />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-md p-2 relative cursor-pointer"
                      onClick={() => handleImageClick(drivingBackRef)}
                      style={{ position: "relative" }} // Add position relative to container
                    >
                      <label htmlFor="drivingBack" className="cursor-pointer ">
                        {data[0].DrivingLinceseback != '' ||  formData.drivingBack ? (
                          <img
                            src={ !formData.drivingBack  ?  getFileIconOrUrl(data[0].DrivingLinceseback) : getPreviewImg(formData.drivingBack) }
                            alt="drivingBack"
                            className={`${data[0].DrivingLinceseback != '' ? 'object-contain w-[200px] h-[100px]' : " "}  `}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <img
                            src="/assets/customer/employee/uploadIcon.svg"
                            alt="uploadIcon"
                            className="absolute inset-0 m-auto"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <input
                          id="drivingBack"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          ref={drivingBackRef}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, "drivingBack")}
                        />
                      </label>
                      {data[0].DrivingLinceseback != ''   ? (
                        ""
                      ) : (
                        <span className="text-xs text-[#005F7E] absolute bottom-4">
                          Хуулах
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add button */}
            <div className="w-full flex flex-col justify-end">
              {error && (
                <p className="text-red-500 w-full text-right my-4">{error}</p>
              )}

              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
                >
                  Нэмэх
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <ToastContainer
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss
          draggable 
          pauseOnHover 
        />
      </div>
    </>) : " "}

     
    </>
  );
};

export default CustomerAndEmployeeEdit;
