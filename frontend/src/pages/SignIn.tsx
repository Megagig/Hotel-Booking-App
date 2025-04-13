import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-clients';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  //Add mutation to the SignIn component

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // showToast({ message: 'Sign in successful', type: 'SUCCESS' });
      // navigate('/');
    },
    onError: (error: Error) => {
      // showToast({ message: error.message, type: 'ERROR' });
    },
  });

  //create a function to handle form submission
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>

      {/* Email field */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      {/* Password field */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
    </form>
  );
};

export default SignIn;
