import { createContext, useState, useContext, FC, ReactNode } from 'react';

// Define the type for your context data

interface ReimbursementDataType {
  LastName: ReactNode;
  FirstName: ReactNode;
  lastName?: string;
  firstName?: string;
  registerNo?: string;
  productName?: string;
  statusName?: string;
  rate?: number;
  invoiceAmount?: number;
}


interface ReimbursementData {
  data: ReimbursementDataType[];
  updateData: (newData: ReimbursementDataType[]) => void;
}

// Create the context
export const ReimbursementContext = createContext<ReimbursementData | undefined>(undefined);

// Custom hook to consume the context
export const useReimbursementContext = (): ReimbursementData => {
  const context = useContext(ReimbursementContext);
  if (!context) {
    throw new Error('useInsuranceContext must be used within an InsuranceProvider');
  }
  return context;
};

// Create a provider component
interface ReimbursementProviderProps {
  children: ReactNode;
}

export const ReimbursementProvider: FC<ReimbursementProviderProps> = ({ children }) => {
  const [data, setData] = useState<ReimbursementDataType[]>([]);

  // Function to modify data
  const updateData = (newData: ReimbursementDataType[]) => {
    setData(newData);
  };

  return (
    <ReimbursementContext.Provider value={{ data, updateData }}>
      {children}
    </ReimbursementContext.Provider>
  );
};
