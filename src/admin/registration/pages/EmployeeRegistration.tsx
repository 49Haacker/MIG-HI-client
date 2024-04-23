import axios from "@/axios";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
// import { FullPageLoader } from "@/components/ui/FullPageLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  lastName: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  registerNumber: z.string().min(5, {
    message: "Register number must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
});

const EmployeeRegistration = () => {
  const [selectedLater1, setSelectedLater1] = useState<string>("");
  const [selectedLater2, setSelectedLater2] = useState<string>("");
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      name: "",
      registerNumber: "",
      phoneNumber: "",
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const combinedValue = {
      LastName: values.lastName,
      Name: values.name,
      RegisterNumber: selectedLater1 + selectedLater2 + values.registerNumber,
      PhoneNo: values.phoneNumber,
    };

    // console.log(combinedValue);

    try {
      await axios.post("admin", combinedValue);

      // console.log(response);
      toast.success("Manager regester successfully");
      setSelectedLater1("");
      setSelectedLater2("");
    } catch (error) {
      console.log("Manager regester error: ", error.response.data.errors[0].msg);
      toast.error(error.response.data.errors[0].msg);

    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-start justify-between w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start w-full"
          >
            <div className="flex flex-col items-start w-full">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* last name */}
                <div className="flex flex-col gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                          Овог
                        </FormLabel>
                        <FormControl>
                          <Input
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

                {/* name */}
                <div className="flex flex-col gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                          Нэр
                        </FormLabel>
                        <FormControl>
                          <Input
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

                {/* dropdown and input box */}
                <div className="flex flex-col gap-2 w-full">
                  <Label
                    htmlFor=""
                    className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]"
                  >
                    Регистрийн дугаар
                  </Label>

                  <div className="flex gap-2">
                    {/* first dropdown */}
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
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={() => handleLaterSelect1("A")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              A
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("Б")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Б
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("B")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              B
                            </button>
                            <button
                              onClick={() => handleLaterSelect1("Г")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Г
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* second dropdown */}
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
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={() => handleLaterSelect2("A")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              A
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("Б")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Б
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("B")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              B
                            </button>
                            <button
                              onClick={() => handleLaterSelect2("Г")}
                              className="block px-4 py-2 text-sm text-[#424B5A] hover:bg-gray-100 hover:text-[#424B5A] w-full text-left"
                              role="menuitem"
                            >
                              Г
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex w-full">
                      <FormField
                        control={form.control}
                        name="registerNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Дугаар"
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
                </div>
              </div>

              {/* phone number */}
              <div className="flex flex-col gap-2 w-full sm:w-[33%] mt-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#424B5A] font-medium text-[14px] leading-[17.36px]">
                        Утасны дугаар
                      </FormLabel>
                      <FormControl>
                        <Input
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

            {/* Add button */}
            <div className="w-full flex flex-col justify-end">
              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#005F7E] hover:bg-[#005f7eed] text-[#FFFFFF] font-bold text-[16px] leading-[20.03px] mb-4"
                  // onClick={form.handleRegisterManager(onclick)}
                >
                  Нэмэх sass
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <ToastContainer
          position="top-right" // Position in the top-right corner
          autoClose={3000} // Auto-close after 3 seconds
          hideProgressBar={false} // Show the progress bar
          newestOnTop={true} // Show new notifications on top
          closeOnClick // Close on click
          rtl={false} // Right-to-left or left-to-right
          pauseOnFocusLoss // Pause when the window loses focus
          draggable // Allow the toast to be dragged
          pauseOnHover // Pause when hovering over the toast
        />

      </div>
    </>
  );
};

export default EmployeeRegistration;
