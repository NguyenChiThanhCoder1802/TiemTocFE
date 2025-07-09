// src/api/servicesAPI.ts
import axios from '../utils/axiosInstance';
import type { Service } from '../types/Service';

export const getAllServices = async (): Promise<Service[]> => {
  const res = await axios.get('/service');
  return res.data;
};

export const createService = async (data: Partial<Service>) => {
  const res = await axios.post('/service', data);
  return res.data;
};

export const updateService = async (id: number, data: Partial<Service>) => {
  const res = await axios.put(`/service/${id}`, data);
  return res.data;
};

export const deleteService = async (id: number) => {
  const res = await axios.delete(`/service/${id}`);
  return res.data;
};
