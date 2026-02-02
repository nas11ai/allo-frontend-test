import axiosInstance from "./axios";
import type { Rocket } from "@/types/rocket";

export const rocketApi = {
  /**
   * Get all rockets
   */
  getAllRockets: async (): Promise<Rocket[]> => {
    const response = await axiosInstance.get<Rocket[]>("/rockets");
    return response.data;
  },
};
