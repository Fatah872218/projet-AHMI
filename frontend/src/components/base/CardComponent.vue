<template>
  <div class="container mx-auto p-4">
    <div
      class="bg-ahmi-bg rounded-minimal shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center"
    >
      <!-- Image Section -->
      <div class="w-full md:w-1/2 mb-4 md:mb-0 md:mr-6">
        <img
          src="/frontend/assets/images/halloween video call-bro.svg"
          alt="Project"
          class="w-full h-auto rounded-minimal"
        />
      </div>

      <!-- Content Section -->
      <div class="w-full md:w-1/2">
        <!-- Title and Date -->
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-ahmi-primary-title font-montserratAlt font-h1-bold-weight text-h2">
            Projet Particip
          </h2>
          <div class="flex items-center">
            <CalendarIcon class="h-6 w-6 text-ahmi-secondary" />
            <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"> 28 mars </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-ahmi-text-primary font-openSans text-body mb-4">
          L'objet de cette association récemment créée est d'organiser et de promouvoir des
          manifestations dans le but de créer un partage ...
        </p>

        <!-- Icons and Actions -->
        <div class="flex justify-start md:justify-end items-center space-x-4">
          <div class="flex items-center">
            <PhotographIcon class="h-6 w-6 text-ahmi-secondary" />
            <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"> Photo </span>
          </div>
          <div class="flex items-center">
            <MailIcon class="h-6 w-6 text-ahmi-secondary" />
            <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"> Email </span>
          </div>
          <div class="flex items-center">
            <MapPinIcon class="h-6 w-6 text-ahmi-secondary" />
            <span class="text-ahmi-text-secondary font-openSans text-caption ml-2">
              Localisation
            </span>
          </div>
          <div class="flex items-center">
            <PlusIcon class="h-6 w-6 text-ahmi-secondary" />
            <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"> Ajouter </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CalendarIcon,
  PhotographIcon,
  MailIcon,
  MapPinIcon,
  PlusIcon,
} from '@heroicons/vue/outline'
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
