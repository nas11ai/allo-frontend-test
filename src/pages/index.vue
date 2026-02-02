<template>
  <div class="rocket-list-page">
    <!-- Header Section -->
    <v-container fluid class="pa-0">
      <v-sheet color="primary" class="pa-4 mb-6">
        <v-container>
          <h1 class="text-h3 text-white font-weight-bold mb-2">
            SpaceX Rockets
          </h1>
          <p class="text-h6 text-white opacity-90">
            Explore the fleet of SpaceX rockets
          </p>
        </v-container>
      </v-sheet>
    </v-container>

    <v-container>
      <!-- Filters and Actions -->
      <v-card class="mb-6" elevation="1">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" md="5">
              <v-text-field
                label="Search rockets"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                clearable
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                label="Filter by status"
                variant="outlined"
                density="comfortable"
                hide-details
              ></v-select>
            </v-col>

            <v-col cols="12" md="3" class="text-right">
              <v-btn color="primary" variant="outlined" density="comfortable">
                Tambah Data
              </v-btn>
            </v-col>
          </v-row>

          <!-- Results Info -->
          <v-row class="mt-2">
            <v-col cols="12">
              <div class="text-caption text-grey">
                Showing {{ 1 }} of {{ 99 }} rockets
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <EmptyState
        title="No Rockets Found"
        message="Try adjusting your search or filter criteria."
        icon="mdi-rocket"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
// TODO: Implement the logic for fetching rockets, handling search and filter
</script>
