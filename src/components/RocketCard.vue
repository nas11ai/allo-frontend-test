<template>
  <v-card
    class="rocket-card"
    :class="{ 'inactive-rocket': !rocket.active }"
    elevation="2"
    hover
    @click="navigateToDetail"
  >
    <v-img
      :src="rocketImage"
      :alt="rocket.name"
      height="250"
      cover
      class="rocket-image"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </template>

      <v-chip
        v-if="!rocket.active"
        class="ma-2"
        color="grey"
        variant="elevated"
      >
        Inactive
      </v-chip>
      <v-chip v-else class="ma-2" color="success" variant="elevated">
        Active
      </v-chip>
    </v-img>

    <v-card-title class="text-h6">
      {{ rocket.name }}
    </v-card-title>

    <v-card-subtitle class="text-caption">
      {{ rocket.country }} • {{ rocket.company }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" variant="text" @click.stop="navigateToDetail">
        View Details
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { Rocket } from "@/types/rocket";

interface Props {
  rocket: Rocket;
}

const props = defineProps<Props>();
const router = useRouter();

const rocketImage = computed(() => {
  if (props.rocket.flickr_images && props.rocket.flickr_images.length > 0) {
    return props.rocket.flickr_images[0];
  }
  return "https://via.placeholder.com/400x250?text=No+Image+Available";
});

const truncatedDescription = computed(() => {
  if (props.rocket.description.length > 150) {
    return props.rocket.description.substring(0, 150) + "...";
  }
  return props.rocket.description;
});

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const navigateToDetail = () => {
  router.push({ name: "rocket-detail", params: { id: props.rocket.id } });
};
</script>

<style scoped>
.rocket-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.rocket-card:hover {
  transform: translateY(-4px);
}

.inactive-rocket {
  opacity: 0.8;
}

.rocket-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: white;
  min-height: 60px;
}

.rocket-image {
  position: relative;
}
</style>
