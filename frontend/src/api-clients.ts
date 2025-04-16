import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
import config from './config';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

//Create the register API call: This function will send a POST request to the server to create a new user.
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${config.apiBaseUrl}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

//Create the sign in API call: This function will send a POST request to the server with the user's email and password.
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${config.apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};
//Create the validate token API call: This function will send a GET request to the server to check if the token is valid.
export const validateToken = async () => {
  const response = await fetch(`${config.apiBaseUrl}/api/auth/validate-token`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token invalid');
  }

  return response.json();
};

//Create the sign out API call: This function will send a POST request to the server to log out the user.
export const signOut = async () => {
  const response = await fetch(`${config.apiBaseUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error during sign out');
  }
};
