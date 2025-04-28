<template>
  <footer class="bg-ahmi-bg text-ahmi-text-primary">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row md:justify-between md:items-start">
        <div class="mb-4 md:mb-0">
          <h3 class="text-h3 font-bold">A.H.M.I</h3>
          <p class="text-body">Aide Humanitaire du Motard Interdépartementale</p>
          <p class="text-body">5 rue Jean Zay, 64 000 PAU</p>
          <p class="text-body">Tél : 06 07 95 25 64</p>
          <p class="text-body">association.ahmi@gmail.com</p>
        </div>
        <div class="mb-4 md:mb-0">
          <h3 class="text-h3 font-bold">Boutique solidaire</h3>
          <p class="text-body">Du lundi au samedi, 10-18h</p>
          <p class="text-body">74, rue Emile Guichenné</p>
          <p class="text-body">64000 PAU</p>
          <a href="https://www.ahmi-boutique.com" target="_blank" class="inline-block">
            <HeartIcon class="w-6 h-6 text-red-500 hover:text-red-700" />
          </a>
        </div>
        <div class="mb-4 md:mb-0">
          <h3 class="text-h3 font-bold">Extranet</h3>
          <ul>
            <li class="text-body"><a href="#" class="text-ahmi-action">Espace presse</a></li>
            <li class="text-body">
              <a href="#" class="text-ahmi-action">Paramètres des cookies</a>
            </li>
            <li class="text-body">
              <a href="#" class="text-ahmi-action">Politique des données personnelles</a>
            </li>
            <li class="text-body"><a href="#" class="text-ahmi-action">Mentions légales</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 flex justify-center space-x-4 md:justify-start">
        <a
          href="https://www.instagram.com/ahmi_official"
          target="_blank"
          class="text-ahmi-text-invert hover:text-ahmi-secondary"
        >
          <CameraIcon class="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/ahmi_official"
          target="_blank"
          class="text-ahmi-text-primary hover:text-ahmi-secondary"
        >
          <XIcon class="w-6 h-6" />
        </a>
        <a
          href="https://www.facebook.com/ahmi.official"
          target="_blank"
          class="text-ahmi-text-primary hover:text-ahmi-secondary"
        >
          <ChatAltIcon class="w-6 h-6" />
        </a>
        <a
          href="https://wa.me/ahmi_official"
          target="_blank"
          class="text-ahmi-text-primary hover:text-ahmi-secondary"
        >
          <PhoneIcon class="w-6 h-6" />
        </a>
        <a
          href="https://t.me/ahmi_official"
          target="_blank"
          class="text-ahmi-text-primary hover:text-ahmi-secondary"
        >
          <ChatIcon class="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/company/ahmi_official"
          target="_blank"
          class="text-ahmi-text-primary hover:text-ahmi-secondary"
        >
          <BriefcaseIcon class="w-6 h-6" />
        </a>
      </div>
      <div class="mt-8 text-center">
        <p class="text-caption">Site réalisé par Younel, Fatah et Elise | Copyright© 2025 AHMI</p>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  HeartIcon,
  CameraIcon, // Pour Instagram
  XIcon,
  ChatAltIcon, // Pour Facebook
  PhoneIcon, // Pour WhatsApp
  ChatIcon, // Pour Telegram
  BriefcaseIcon, // Pour LinkedIn
} from '@heroicons/vue/outline'

export default {
  name: 'FooterComponent',
  components: {
    HeartIcon,
    CameraIcon,
    XIcon,
    ChatAltIcon,
    PhoneIcon,
    ChatIcon,
    BriefcaseIcon,
  },
}
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
