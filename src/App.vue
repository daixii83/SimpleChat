<template>
  <div class="w-full h-dvh flex flex-col text-center">
    <main class="h-full flex-1">
      <router-view></router-view>
    </main>
    <FloatMessage/>
  </div>
</template>

<script setup>
  import FloatMessage from "./components/FloatMessage.vue";
</script>
