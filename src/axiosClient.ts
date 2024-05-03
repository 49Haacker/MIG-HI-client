import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://202.131.231.212:93/api/", // Base URL for your API
  timeout: 10000, // Optional timeout to prevent requests from hanging
});

// Request interceptor to add the API key to all outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['APIkey'] = 'HABBVtrHLF3YV'; // Custom header for API key
    config.headers['Content-Type'] = 'application/json'; // Ensure the content type is correct
    
    return config; // Return the updated config
  },
  (error) => {
    // Handle errors that occur during request setup
    return Promise.reject(error);
  }
);

// Error handling and response interceptor (optional but recommended)
axiosInstance.interceptors.response.use(
  (response) => {
    // Optionally process the response here
    return response; // Return the response if everything is okay
  },
  (error) => {
    // Handle errors that occur during the response
    if (error.response) {
      // If the error has a response, you can check the status code
      console.error('HTTP Error:', error.response.status, error.response.data);
    } else {
      console.error('Network or server error:', error.message);
    }
    return Promise.reject(error); // Reject the promise to allow further error handling
  }
);

export default axiosInstance;

export { AxiosError };
