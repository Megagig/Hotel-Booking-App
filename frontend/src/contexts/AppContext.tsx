import { createContext, useContext, useState } from 'react';

// Define Toast Message Type
type ToastMessage = {
  message: string;
  type: 'success' | 'error';
};

// Define App Context Type
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
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

  return (
    <AppContext.Provider value={{ showToast }}>
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
