import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { rocketApi } from "@/api/rockets";
import type { Rocket } from "@/types/rocket";

export const useRocketStore = defineStore("rockets", () => {
  // State
  const rockets = ref<Rocket[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filterActive = ref<boolean | null>(null);
  const searchQuery = ref("");

  // Getters
  const filteredRockets = computed(() => {
    let filtered = rockets.value;

    // Filter by active status
    if (filterActive.value !== null) {
      filtered = filtered.filter(
        (rocket) => rocket.active === filterActive.value,
      );
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (rocket) =>
          rocket.name.toLowerCase().includes(query) ||
          rocket.country.toLowerCase().includes(query),
      );
    }

    return filtered;
  });

  const activeRockets = computed(() =>
    rockets.value.filter((rocket) => rocket.active),
  );

  const inactiveRockets = computed(() =>
    rockets.value.filter((rocket) => !rocket.active),
  );

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

  const setFilter = (active: boolean | null) => {
    filterActive.value = active;
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    rockets,
    loading,
    error,
    filterActive,
    searchQuery,
    // Getters
    filteredRockets,
    activeRockets,
    inactiveRockets,
    // Actions
    fetchRockets,
    setFilter,
    setSearchQuery,
    clearError,
  };
});
