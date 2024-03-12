<template>
  <div class="w-full h-dvh flex flex-col text-center">
    <main class="h-full flex-1">
      <router-view></router-view>
    </main>
    <footer class="bg-surface-100 py-4 shadow"></footer>
    <FloatMessage
      v-if="notification.isVisible"
      :message="notification.message"
    />
  </div>
</template>

<script setup>
  import { useNotification } from './stores/notification';
  import FloatMessage from "./components/FloatMessage.vue";
  
  const notification = useNotification();
</script>
