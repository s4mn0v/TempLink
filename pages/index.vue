<template>
  <div>
    <LinkForm />
    <h2>Enlaces Activos</h2>
    <ul>
      <li v-for="link in activeLinks" :key="link.id">
        <nuxt-link :to="`/links/${link.id}`">{{ link.title }}</nuxt-link> - {{ link.timeLimit }} mins
        <button @click="deleteLink(link.id)">Borrar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLinksStore } from '@/store/links';
import LinkForm from '@/components/LinkForm.vue';

const store = useLinksStore();

const activeLinks = computed(() => store.links.filter(link => store.isLinkValid(link.id)));

function deleteLink(id: string) {
  store.deleteLink(id);
}

onMounted(() => {
  store.loadLinks();
});
</script>