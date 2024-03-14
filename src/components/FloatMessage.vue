<template>
    <transition name="fade">
        <div
            v-if="notification.isVisible"
            class="fixed bottom-4 right-4 bg-primary-400 text-black text-base font-normal p-2.5 rounded-md"
        >
            {{ notification.message }}
        </div>
    </transition>
</template>

<script setup>
    import { useNotification } from '../stores/notification.js';

    const notification = useNotification();
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to, .fade-leave-from {
        opacity: 1;
    }
</style>