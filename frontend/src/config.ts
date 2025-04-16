const config = {
  apiBaseUrl: import.meta.env.PROD
    ? 'https://hotel-booking-app-06gf.onrender.com' // Replace with your deployed backend URL
    : 'http://localhost:7000/api',
};

export default config;
