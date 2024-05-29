import { createContext, useState, useContext, FC, ReactNode } from 'react';

// Define the type for your context data
interface UserDetails {
  LastName: string;
  Name: string;
  RegisterNumber: string;
  PhoneNo: string;
  VehicleCertificate?: string;
  IdentitybackCertificate?: string;
  SteeringWheelCertificate?: string;
  DrivingLinceseback?: string;
  CivilWarCertificate?: string;
}

interface UserData {
  data: UserDetails[];
  updateData: (newData: UserDetails[]) => void;
}

// Create the context
export const UserContext = createContext<UserData | undefined>(undefined);

// Custom hook to consume the context
export const useUserContext = (): UserData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [data, setData] = useState<UserDetails[]>([]);

  // Function to modify data
  const updateData = (newData: UserDetails[]) => {
    setData(newData);
  };

  return (
    <UserContext.Provider value={{ data, updateData }}>
      {children}
    </UserContext.Provider>
  );
};
