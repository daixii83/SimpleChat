<template>
  <div class="w-full h-dvh flex flex-col text-center">
    <main class="h-full flex-1">
      <router-view></router-view>
    </main>
    <footer class="bg-surface-100 py-4 shadow"></footer>
    <FloatMessage ref="floatMessage" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import FloatMessage from "./components/FloatMessage.vue";
  // 引用訊息元件
  const floatMessage = ref(null);
  const showNotification = (message) => {
    floatMessage.value.showMessage(message);
  };
</script>
