import ky from "ky";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getColors = async () => {
  return await ky.get(`${API_BASE_URL}/colors`).json();
};

export const submitUserData = async (data) => {
  return await ky.post(`${API_BASE_URL}/submit`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
