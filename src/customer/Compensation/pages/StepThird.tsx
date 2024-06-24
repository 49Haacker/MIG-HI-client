import { ChangeEvent, useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "@/axios";
import pdfIcon from "@/assets/eclaim/pdf.png";
import wordIcon from "@/assets/eclaim/word.png";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface Section {
  id: number;
  title: string;
  images: string[];
  files: File[];
}

interface QuitImage {
  quitsType: string | Blob;
  F1: string;
  F2: string;
  F3: string;
  F4?: string; // Optional if you want to include base64 image data
}

interface StepThirdProps {
  stepThreeData:  null;
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const StepThird: React.FC<StepThirdProps> = ({ stepThreeData }) => {


  console.log("last Step",stepThreeData);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState([]);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [sections, setSections] = useState<Section[]>([
    { id: 0, title: "Нөхөн төлбөрийн маягт", images: [], files: [] },
    { id: 1, title: "Нөхөн төлбөр хүсэх хуудас", images: [], files: [] },
    {
      id: 2,
      title: "Эмчийн онош, шинжилгээ, дүгнэлт",
      images: [],
      files: [],
    },
    { id: 3, title: "Төлбөр төлсөн и-баримтууд", images: [], files: [] },
    {
      id: 4,
      title: "Бусад /Эмийн жор, жорын дагуух худалдан авалтууд/",
      images: [],
      files: [],
    },
  ]);

  const handleImageClick = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].click();
    }
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    sectionId: number
  ) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));


    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              images: [...section.images, ...newImages],
              files: [...section.files, ...files],
            }
          : section
      )
    );
  };

  const removeImage = (sectionId: number, index: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              images: section.images.filter((_, i) => i !== index),
              files: section.files.filter((_, i) => i !== index),
            }
          : section
      )
    );
  };


  const findMissingNumbers = (arr, rangeStart, rangeEnd) => {
    // Create a set of numbers from rangeStart to rangeEnd
    const fullRange = new Set(Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart));
    
    // Extract numbers from the F1 field and convert them to numbers
    const presentNumbers = new Set(arr.map(item => parseInt(item.F1, 10)));
  
    // Find the difference between the full range and the present numbers
    let missingNumbers = [...fullRange].filter(number => !presentNumbers.has(number));
    
    // Check if the number 3 is present less than two times
    const count3 = arr.filter(item => parseInt(item.F1, 10) === 3).length;
    if (count3 < 2) {
      missingNumbers.push(3);
    }
  
    return missingNumbers;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
  
  
  const SendClaim = async () => {
    setIsLoading(true);
    try {
      console.log("Sending sections:", sections);

      if (!Array.isArray(sections) || sections.length === 0) {
        throw new Error("Sections are not valid or empty.");
      }
      const datass = stepThreeData;
      const current_date = new Date();
      const formatted_date = formatDate(current_date);
      const formData = new FormData();
      formData.append("f1", ""); // Reimbursement number
      formData.append("f2", "3"); // Contract Type Number
      formData.append("f3", datass.contract.ContractId); // ContractID
      formData.append("f4", datass.contract.ContractDetailId); // ContractDetailId
      formData.append("f5", "1807060001"); // ProductID
      formData.append("f6", formatted_date); // Current date
      formData.append("f7", formatted_date); // Date of claim
      formData.append("f8", formatted_date); // Date of Case date
      formData.append("f9", "1"); // Case number
      formData.append("f10", ""); // Plate number
      formData.append("f11", localStorage.getItem('phNo')); // Phone number
      formData.append("f12", datass.step1); // Additional information
      formData.append("f13", datass.step2); // Claimed amount

      const imagePromises: Promise<QuitImage>[] = sections.flatMap(
        (section, sectionIndex) =>
          section.files.map((file) =>
            convertFileToBase64(file).then((base64Image) => ({
              quitsType:`${section.title}`,
              F1: `${section.id}`, // Assuming F1 needs to be a string
              F2: `${file.name}`,
              F3: file.name,
              F4: base64Image.split(",")[1], // Remove the base64 prefix if necessary
            }))
          )
      );

      const QUITSIMAGES: QuitImage[] = await Promise.all(imagePromises);

        // console.log(QUITSIMAGES);

        const missingNumbers = findMissingNumbers(QUITSIMAGES, 1, 4);

          if(missingNumbers.length > 0){
            setErrors(missingNumbers);
            throw new Error("Sections are not valid or empty.");
          }else{
            setErrors([]);

          }
        // console.log(missingNumbers); 
      // if (!Array.isArray(sections) || sections.length === 0) {
      //   throw new Error("Sections are not valid or empty.");
      // }
      

      QUITSIMAGES.forEach((image, index) => {
        formData.append(`QUITSIMAGES[${index}][F1]`, image.F1.toString());
        formData.append(`QUITSIMAGES[${index}][quitsType]`, image.quitsType);
        formData.append(`QUITSIMAGES[${index}][F2]`, image.F2);
        formData.append(`QUITSIMAGES[${index}][F3]`, image.F3);
        if (image.F4) {
          formData.append(`QUITSIMAGES[${index}][F4]`, image.F4);
        }
      });

      const response = await axios.post("/Quits/Insert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setIsLoading(false);
        navigate('/compensation/reimbursement-history');
      }

      toast.success(response.data.message);
     
      console.log("Response:", response.data);
    } catch (error: any) {
      setIsLoading(false);
      const errorIs = error.response.data.error;
      toast.error(errorIs);

      console.error("Error sending data:", error);
    }
  };

  
  return (
    <>
      <div className="flex justify-between flex-col w-full mt-8">
        <FullPageLoader isLoading={isLoading} />

        <div className="flex gap-8 flex-col w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#424B5A] font-medium text-2xl leading-4">
              Нөхөн төлбөрийн матерал хуулах
            </h1>
            <p className="text-[#8CAAB1] font-normal leading-4">
              **Та оруулж байгаа бичиг баримтын зургийг тод гаргацтай авч
              оруулна уу. Мөн (<span className="text-red-500">*</span>)-оор
              тэмдэглэсэн талбарыг заавал бөглөнө үү.
            </p>
          </div>

          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="flex flex-col w-full">
              <div
                className={`gap-2 my-3 ${
                  section.images.length > 0
                    ? "flex w-full flex-wrap"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {section.images.length > 0 ? (
                  <>
                    <div className="w-full md:w-auto">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#424B5A] text-md font-normal leading-4">
                          {section.title}{" "}
                          {sectionIndex > 0 ? (
                            <span className="text-[red]">*</span>
                          ) : (
                            ""
                          )}  


                        </span>
                        <span className="mt-0 mb-3 text-[red]">  
                        {errors.includes(sectionIndex) ? (
                          <span className="mt-0 mb-3 text-[red]">
                            Upload at least {sectionIndex === 3 ? '2' : '1'} image
                          </span>
                        ) : " "}

                           </span>

                        <div className="flex flex-row flex-wrap gap-2 mt-2 w-full">
                          {section.images.map((image, index) => (
                            <>
                           
                            <div key={index} className="w-full md:w-auto ">
                              <span className="flex justify-between">
                                <span className="mb-1">{`preview-${index}`}</span>
                                <button
                                  className="p-1"
                                  onClick={() => removeImage(section.id, index)}
                                >
                                  <RiDeleteBinLine className="text-red-600 text-1xl" />
                                </button>
                              </span>
                              <div
                                className="bg-[#E6EFF2] h-[120px] md:px-[90px] mx:w-[337px] rounded-lg p-2 cursor-pointer"
                                onClick={() => handleImageClick(sectionIndex)}
                              >
                                {section.files[index].type === "image/png" ||
                                section.files[index].type === "image/jpg" ? (
                                  <img
                                    src={image}
                                    alt={`preview-${index}`}
                                    className="object-cover rounded-lg h-[104px] w-full md:w-auto"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : section.files[index].type ===
                                  "application/pdf" ? (
                                  <img
                                    src={pdfIcon}
                                    alt="PDF Icon"
                                    className="object-cover rounded-lg h-[104px] w-full md:w-auto"
                                  />
                                ) : section.files[index].type ===
                                    "application/msword" ||
                                  section.files[index].type ===
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                  <img
                                    src={wordIcon}
                                    alt="Word Icon"
                                    className="object-cover rounded-lg h-[104px] w-full md:w-auto"
                                  />
                                ) : (
                                  <div className="flex justify-center items-center h-[104px] w-full md:w-auto text-gray-500">
                                    Unsupported file type
                                  </div>
                                )}
                              </div>
                       


                            </div>
                               
                          </>
                          ))}
                          

                          {sectionIndex == 3 && section.images.length <= 1 ? (
                            <div
                              className="bg-[#E6EFF2] h-[120px] mt-6 w-[100%] md:w-[377px] max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                              onClick={() => handleImageClick(sectionIndex)}
                              style={{ position: "relative" }}
                            >
                              <label
                                htmlFor={`imageInput-${section.id}`}
                                className="cursor-pointer"
                              >
                                <img
                                  src="/assets/customer/employee/uploadIcon.svg"
                                  alt="uploadIcon"
                                  className="absolute inset-0 m-auto"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <input
                                  id={`imageInput-${section.id}`}
                                  type="file"
                                  ref={(el) =>
                                    (inputRefs.current[sectionIndex] = el!)
                                  }
                                  style={{ display: "none" }}
                                  onChange={(e) =>
                                    handleFileChange(e, section.id)
                                  }
                                />
                              </label>
                              <span
                                className="text-xs text-[#005F7E] absolute bottom-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Хуулах
                              </span>
                            </div>
                          ) : null}

                          <div
                            className="h-[120px] px-2 w-[100%] md:w-[377px] max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                            onClick={() => handleImageClick(sectionIndex)}
                            style={{ position: "relative" }}
                          >
                            <label
                              htmlFor={`imageInput-${section.id}`}
                              className="cursor-pointer"
                            >
                              <img
                                src="/assets/customer/employee/add.svg"
                                alt="uploadIcon"
                                className="absolute inset-0 m-auto"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <input
                                id={`imageInput-${section.id}`}
                                type="file"
                                ref={(el) =>
                                  (inputRefs.current[sectionIndex] = el!)
                                }
                                style={{ display: "none" }}
                                onChange={(e) =>
                                  handleFileChange(e, section.id)
                                }
                              />
                            </label>
                            <span
                              className="text-xs text-[#005F7E] absolute bottom-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Нэмэх
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-2 sm:whitespace-nowrap">
                      <span className="text-[#424B5A] text-md font-normal leading-4 pb-3">
                        {section.title}{" "}
                        {sectionIndex > 0 ? (
                          <span className="text-[red]">*</span>
                        ) : (
                          ""
                        )}{" "}
                        
                        {errors.includes(sectionIndex) ? (
                          <span className="mt-0 mb-3 text-[red]">
                            Upload at least {sectionIndex === 3 ? '2' : '1'} image
                          </span>
                        ) : " "}
                      </span>

                      <div
                        className="bg-[#E6EFF2] h-[120px] w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                        onClick={() => handleImageClick(sectionIndex)}
                        style={{ position: "relative" }}
                      >
                        <label
                          htmlFor={`imageInput-${section.id}`}
                          className="cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src="/assets/customer/employee/uploadIcon.svg"
                            alt="uploadIcon"
                            className="absolute inset-0 m-auto"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <input
                            id={`imageInput-${section.id}`}
                            type="file"
                            ref={(el) =>
                              (inputRefs.current[sectionIndex] = el!)
                            }
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, section.id)}
                          />
                        </label>
                        <span
                          className="text-xs text-[#005F7E] absolute bottom-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Хуулах
                        </span>
                      </div>
                    </div>
                    {sectionIndex == 3 ? (
                      <div
                        className="bg-[#E6EFF2] h-[120px] md:mt-9 w-full max-w-sm flex flex-col justify-center items-center rounded-lg p-2 relative cursor-pointer"
                        onClick={() => handleImageClick(sectionIndex)}
                        style={{ position: "relative" }}
                      >
                        <label
                          htmlFor={`imageInput-${section.id}`}
                          className="cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src="/assets/customer/employee/uploadIcon.svg"
                            alt="uploadIcon"
                            className="absolute inset-0 m-auto"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <input
                            id={`imageInput-${section.id}`}
                            type="file"
                            ref={(el) =>
                              (inputRefs.current[sectionIndex] = el!)
                            }
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, section.id)}
                          />
                        </label>
                        <span
                          className="text-xs text-[#005F7E] absolute bottom-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Хуулах
                        </span>
                      </div>
                    ) : null}
                    <div
                      className="h-[120px] max-w-sm flex flex-col justify-center items-center rounded-lg border-[2px] border-dashed border-[#1A6F8B] p-2 relative cursor-pointer mt-auto"
                      onClick={() => handleImageClick(sectionIndex)}
                      style={{ position: "relative" }}
                    >
                      <label
                        htmlFor={`imageInput-${section.id}`}
                        className="cursor-pointer"
                      >
                        <img
                          src="/assets/customer/employee/add.svg"
                          alt="uploadIcon"
                          className="absolute inset-0 m-auto"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <input
                          id={`imageInput-${section.id}`}
                          type="file"
                          ref={(el) => (inputRefs.current[sectionIndex] = el!)}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e, section.id)}
                        />
                      </label>

                      <span
                        className="text-xs text-[#005F7E] absolute bottom-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Нэмэх
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={SendClaim}
              className="p-2 px-5 mb-3 rounded-md bg-[#0E5073] text-white hover:bg-[#0F6691]"
            >
              Илгээх
            </button>
          </div>
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
      </div>
    </>
  );
};

export default StepThird;
