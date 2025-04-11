import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';

// Define Toast Message Type
type ToastMessage = {
  message: string;
  type: 'success' | 'error';
};

// Define App Context Type
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

// Create the context
const AppContext = createContext<AppContext | undefined>(undefined);

// Create the provider component
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Function to show toast messages
  const showToast = (toastMessage: ToastMessage) => {
    setToast(toastMessage);
  };
  const { isError } = useQuery('validateToken', apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider value={{ showToast, isLoggedIn: !isError }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// Create a hook for easy context access
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
