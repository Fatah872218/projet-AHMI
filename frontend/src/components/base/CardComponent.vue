<template>
  <div
    class="bg-ahmi-bg rounded-minimal shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center mb-4"
  >
    <!-- Image Section -->
    <div class="w-full md:w-1/2 mb-4 md:mb-0 md:mr-6">
      <img
        v-if="evenement.imageUrl"
        :src="evenement.imageUrl"
        :alt="evenement.titre"
        class="w-full h-auto rounded-minimal"
      />
    </div>

    <!-- Content Section -->
    <div class="w-full md:w-1/2">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-ahmi-primary-title font-montserratAlt font-h1-bold-weight text-h2">
          {{ evenement.titre }}
        </h2>
        <div class="flex items-center">
          <CalendarIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2">
            {{ formatDate(evenement.dateDebut) }}
          </span>
        </div>
      </div>

      <p class="text-ahmi-text-primary font-openSans text-body mb-4">
        {{ truncateDescription(evenement.description) }}
      </p>

      <!-- Additional Details -->
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4"
      >
        <div class="flex items-center" v-if="evenement?.lieu?.adresse">
          <LocationMarkerIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2 hidden md:inline">
            Lieu:
          </span>
          <span class="text-ahmi-text-primary font-openSans text-caption ml-2">
            {{ evenement.lieu.adresse }}
          </span>
        </div>

        <div class="flex items-center" v-if="evenement?.organisateur?.email">
          <MailIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="ml-2 text-caption text-ahmi-text-secondary hidden md:inline"> Email: </span>
          <span class="ml-2 text-caption text-ahmi-text-primary">
            {{ evenement.organisateur.email }}
          </span>
        </div>

        <div class="flex items-center" v-if="evenement.lienSiteInternet">
          <GlobeAltIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="hidden md:inline ml-2"> Site Internet: </span>
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
          <span class="hidden md:inline ml-2"> Instagram: </span>
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

      <!-- Actions -->
      <div class="flex items-center justify-between md:justify-end space-x-4">
        <button
          class="bg-ahmi-primary text-ahmi-text-invert font-openSans text-caption px-4 py-2 rounded-minimal"
        >
          Réserver
        </button>
        <div class="flex items-center cursor-pointer" @click="goToEventDetails">
          <PlusIcon class="h-6 w-6 text-ahmi-secondary" />
          <span class="text-ahmi-text-secondary font-openSans text-caption ml-2 hidden md:inline">
            Détails
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CalendarIcon,
  LocationMarkerIcon,
  MailIcon,
  GlobeAltIcon,
  PhotographIcon,
  PlusIcon,
} from '@heroicons/vue/outline'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { useRouter } from 'vue-router'

const props = defineProps({
  evenement: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const formatDate = (date) => {
  if (!date) return 'Date inconnue'
  try {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr })
  } catch {
    return date
  }
}

const truncateDescription = (desc) => {
  if (!desc) return ''
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
}

const goToEventDetails = () => {
  if (props.evenement?._id) {
    router.push(`/evenement/${props.evenement._id}`)
  }
}
</script>

<style scoped>
/* Styles additionnels si nécessaires */
</style>
