import { defineStore } from "pinia";
import { ref } from "vue";
import { rocketApi } from "@/api/rockets";
import type { Rocket } from "@/types/rocket";

export const useRocketStore = defineStore("rockets", () => {
  // State
  const rockets = ref<Rocket[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchRockets = async () => {
    loading.value = true;
    error.value = null;
    try {
      rockets.value = await rocketApi.getAllRockets();
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch rockets";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    rockets,
    loading,
    error,
    // Actions
    fetchRockets,
    clearError,
  };
});
