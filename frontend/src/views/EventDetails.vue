<template>
  <div class="container mx-auto p-4">
    <div v-if="!evenement">Chargement ou événement introuvable...</div>
    <div v-else>
      <h1 class="text-ahmi-primary-title font-montserratAlt font-h1-bold-weight text-h2 mb-4">
        {{ evenement.titre }}
      </h1>
      <img
        v-if="evenement.imageUrl"
        :src="evenement.imageUrl"
        :alt="evenement.titre"
        class="w-full h-auto rounded-minimal mb-4"
      />
      <p class="text-ahmi-text-primary font-openSans text-body mb-4">
        {{ evenement.description }}
      </p>
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4"
      >
        <div class="flex items-center" v-if="evenement?.lieu?.adresse">
          <LocationMarkerIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2">Lieu:</span>
          <span class="text-ahmi-text-primary font-openSans text-caption ml-2">
            {{ evenement.lieu.adresse }}
          </span>
        </div>
        <div class="flex items-center" v-if="evenement?.organisateur?.email">
          <MailIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2">Email:</span>
          <span class="text-ahmi-text-primary font-openSans text-caption ml-2">
            {{ evenement.organisateur.email }}
          </span>
        </div>
        <div class="flex items-center" v-if="evenement.lienSiteInternet">
          <GlobeAltIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"
            >Site Internet:</span
          >
          <a
            :href="evenement.lienSiteInternet"
            class="text-ahmi-text-primary font-openSans text-caption ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ evenement.lienSiteInternet }}
          </a>
        </div>
        <div class="flex items-center" v-if="evenement.lienInstagram">
          <PhotographIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2">Instagram:</span>
          <a
            :href="evenement.lienInstagram"
            class="text-ahmi-text-primary font-openSans text-caption ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ evenement.lienInstagram }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useEvenementsStore } from '@/stores/evenements'
import { computed } from 'vue'
import { LocationMarkerIcon, MailIcon, GlobeAltIcon, PhotographIcon } from '@heroicons/vue/outline'

const route = useRoute()
const store = useEvenementsStore()

const evenement = computed(() => store.allEvenements.find((e) => e._id === route.params.id))
</script>
