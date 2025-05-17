import axios from 'axios';

                                    

export const getUsers = async () => {
  return axios.get('http://localhost:3000/users', {
    withCredentials: true,
  });
};



export const signup = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/users', formData, {
      withCredentials: true, // include if your backend sets auth cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // return the created user or auth token, depending on backend
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};


export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Maybe a token, user object, etc.
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};




