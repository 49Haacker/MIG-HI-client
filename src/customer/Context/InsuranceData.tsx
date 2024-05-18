import { createContext, useState, useContext, FC, ReactNode } from 'react';

// Define the type for your context data
interface InsuranceData {
  data: number[];
  updateData: (newData: number[]) => void;
}

// Create the context
export const InsuranceContext = createContext<InsuranceData | undefined>(undefined);

// Custom hook to consume the context
export const useInsuranceContext = (): InsuranceData => {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error('useInsuranceContext must be used within an InsuranceProvider');
  }
  return context;
};

// Create a provider component
interface InsuranceProviderProps {
  children: ReactNode;
}

export const InsuranceProvider: FC<InsuranceProviderProps> = ({ children }) => {
  const [data, setData] = useState<number[]>([]);

  // Function to modify data
  const updateData = (newData: number[]) => {
    setData(newData);
  };

  return (
    <InsuranceContext.Provider value={{ data, updateData }}>
      {children}
    </InsuranceContext.Provider>
  );
};
