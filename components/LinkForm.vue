<template>
  <div class="link-form">
    <h3>Crear Nuevo Enlace Temporal</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título:</label>
        <input 
          id="title"
          v-model="formData.title"
          type="text"
          required
          placeholder="Ingrese el título del enlace"
        />
      </div>
      <div class="form-group">
        <label for="timeLimit">Tiempo límite (minutos):</label>
        <input 
          id="timeLimit"
          v-model.number="formData.timeLimit"
          type="number"
          required
          min="1"
          max="60"
        />
      </div>
      <button type="submit">Crear Enlace</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLinksStore } from '@/store/links';

const store = useLinksStore();
const formData = ref({
  title: '',
  timeLimit: 5
});

const handleSubmit = () => {
  store.addLink(formData.value.title, formData.value.timeLimit);
  formData.value = {
    title: '',
    timeLimit: 5
  };
};
</script>