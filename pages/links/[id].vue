<template>
  <div class="temp-link-page">
    <div v-if="isLinkValid" class="link-content">
      <h2>{{ link.title }}</h2>
      <div class="time-remaining">
        Tiempo restante: {{ formatTimeRemaining }}
      </div>
      <div class="link-message">
        <p>Este es un enlace temporal. El contenido estará disponible por un tiempo limitado.</p>
      </div>
    </div>
    <div v-else class="error-message">
      <p>El enlace no es válido o ha expirado.</p>
      <NuxtLink to="/" class="back-link">Volver al inicio</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLinksStore } from '@/store/links';

const route = useRoute();
const store = useLinksStore();
const linkId = route.params.id as string;

const timeRemaining = ref(0);

const link = computed(() => store.links.find(l => l.id === linkId));
const isLinkValid = computed(() => store.isLinkValid(linkId));

const formatTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const updateTimeRemaining = () => {
  if (link.value && isLinkValid.value) {
    const now = Date.now();
    const expirationTime = link.value.createdAt + (link.value.timeLimit * 60 * 1000);
    const remaining = Math.max(0, Math.floor((expirationTime - now) / 1000));
    timeRemaining.value = remaining;

    if (remaining <= 0) {
      store.deleteLink(linkId);
    }
  }
};

let timer: number;

onMounted(() => {
  store.loadLinks(); // Ensure links are loaded
  if (isLinkValid.value) {
    updateTimeRemaining();
    timer = window.setInterval(updateTimeRemaining, 1000);
  }
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>