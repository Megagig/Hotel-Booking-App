// frontend/src/components/SignOutButton.tsx
import { useMutation, useQueryClient } from 'react-query';
import * as API_client from '../api-clients';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(API_client.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'Signed out', type: 'success' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'error' });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
