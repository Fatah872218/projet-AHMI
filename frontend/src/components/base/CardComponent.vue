<template>
  <div
    class="bg-ahmi-bg rounded-minimal shadow-md p-4 md:p-6 flex flex-col space-y-6 mb-4 h-full overflow-hidden"
  >
    <!-- Bloc 1 - Image -->
    <div class="w-full h-64 md:h-96">
      <img
        v-if="evenement.imageUrl"
        :src="evenement.imageUrl"
        :alt="evenement.titre"
        class="w-full h-full object-cover rounded-minimal"
      />
    </div>

    <!-- Bloc 2 - Titre & Date -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
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

    <!-- Bloc 3 - Description -->
    <div>
      <p class="text-ahmi-text-primary font-openSans text-body line-clamp-2">
        {{ evenement.description }}
      </p>
    </div>

    <!-- Bloc 4 - Infos complémentaires -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex items-center" v-if="evenement?.lieu?.adresse">
        <LocationMarkerIcon class="h-6 w-6 text-ahmi-secondary" />
        <span class="ml-2 text-caption text-ahmi-text-primary">
          {{ evenement.lieu.adresse }}
        </span>
      </div>

      <div class="flex items-center" v-if="evenement?.organisateur?.email">
        <MailIcon class="h-6 w-6 text-ahmi-secondary" />
        <span class="ml-2 text-caption text-ahmi-text-primary">
          {{ evenement.organisateur.email }}
        </span>
      </div>

      <div class="flex items-center" v-if="evenement.lienSiteInternet">
        <GlobeAltIcon class="h-6 w-6 text-ahmi-secondary" />
        <a
          :href="evenement.lienSiteInternet"
          class="ml-2 text-caption text-ahmi-text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ evenement.lienSiteInternet }}
        </a>
      </div>

      <div class="flex items-center" v-if="evenement.lienInstagram">
        <PhotographIcon class="h-6 w-6 text-ahmi-secondary" />
        <a
          :href="evenement.lienInstagram"
          class="ml-2 text-caption text-ahmi-text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ evenement.lienInstagram }}
        </a>
      </div>
    </div>

    <!-- Bloc 5 - Actions -->
    <div class="flex items-center justify-between md:justify-end gap-4">
      <button
        class="bg-ahmi-primary text-ahmi-text-invert font-openSans text-caption px-4 py-2 rounded-minimal"
      >
        Réserver
      </button>
      <div class="flex items-center cursor-pointer" @click="goToEventDetails">
        <PlusIcon class="h-6 w-6 text-ahmi-secondary" />
        <span class="text-ahmi-text-secondary font-openSans text-caption ml-2"> Détails </span>
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
/* Ajoute ici des styles spécifiques si besoin */
</style>
