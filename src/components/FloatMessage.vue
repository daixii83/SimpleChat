<template>
    <transition name="fade">
        <div
            v-if="message"
            class="fixed bottom-4 right-4 bg-primary-400 text-mixed-200 p-4 rounded-md"
        >
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
    import { ref } from 'vue';
    const message = ref('');

    const showMessage = (newMessage) => {
        message.value = newMessage;
        setTimeout(() => {
            message.value = '';
        }, 3000);
    };
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter-from,
    .fade-enter-to {
        opacity: 0;
    }
</style>