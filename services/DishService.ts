import Api from './api';

export type DishPayload = {
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'entree' | 'main course' | 'dessert' | 'beverage' | 'snack';
  ingredients: string;
};

type ApiResponse<T> = {
  success: boolean;
  error: boolean;
  message: string;
  data: T;
};

export const createDish = async (
  data: DishPayload,
  token: string
): Promise<DishPayload> => {
  const response = await Api.post<ApiResponse<DishPayload>>('/dishes', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string;
  category: 'entree' | 'main course' | 'dessert' | 'beverage' | 'snack';
};

export const getAllDishes = async (): Promise<Dish[]> => {
  const response = await Api.get<ApiResponse<Dish[]>>("/dishes");
  return response.data.data;
};

export const getDishById = async (id: number): Promise<Dish> => {
  const response = await Api.get<ApiResponse<Dish>>(`/dishes/${id}`);
  return response.data.data;
};
