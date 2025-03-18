import apiClient from "./apiClient.js";

export const getEmployees = async () => {
  return apiClient.get("/employees").then((res) => res.data);
};

export const createEmployees = async (form) => {
  return apiClient.post("/employees", form).then((res) => res.data);
};
