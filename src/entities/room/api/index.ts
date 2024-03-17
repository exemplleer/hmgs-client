import { instance, API_ENDPOINTS } from '@/shared/api';
import { IRoom } from '../model/interfaces';

export const getRooms = async () => {
  try {
    const res = await instance.get(API_ENDPOINTS.ROOMS);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOneRoom = async (id: number) => {
  try {
    const res = await instance.get(`${API_ENDPOINTS.ROOMS}/${id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createRoom = async (data: IRoom) => {
  try {
    const res = await instance.post(`${API_ENDPOINTS.ROOMS}`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateRoom = async (id: number, data: Partial<IRoom>) => {
  try {
    const res = await instance.patch(`${API_ENDPOINTS.ROOMS}/${id}`, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeRoom = async (id: number) => {
  try {
    const res = await instance.delete(`${API_ENDPOINTS.ROOMS}/${id}`);
    return res.data;
  } catch (error) {
    Promise.reject(error);
  }
};
