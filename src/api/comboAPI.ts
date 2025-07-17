import axios from '../../src/utils/axiosInstance';
import type { ComboDto, CreateComboDto } from '../types/Combo';

export const getCombos = async (): Promise<ComboDto[]> => {
  const res = await axios.get('/combo');
  return res.data;
};

export const getComboById = async (id: number): Promise<ComboDto> => {
  const res = await axios.get(`/combo/${id}`);
  return res.data;
};

export const createCombo = async (data: CreateComboDto): Promise<ComboDto> => {
  const res = await axios.post('/combo', data);
  return res.data;
};

export const deleteCombo = async (id: number): Promise<void> => {
  await axios.delete(`/combo/${id}`);
};
