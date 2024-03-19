<template>
    <div class="chat-page">
        <UserSuggestions @add-user="addUserToChat" />
        <div class="chat-container">
            <div class="messages"></div>
            <form
                @submit.prevent="sendMessage"
            >
                <input
                    v-model="message"
                    type="text"
                    placeholder="type a message..."
                />
                <button type="submit">send</button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import UserSuggestions from './UserSuggestions.vue';
    import { useChat } from '../stores/chat.js';

    const chat = useChat();
    const message = ref('');
    const sendMessage = () => {
        console.log('sending message:',  message.value);
        message.value = '';
    };

    const addUserToChat = (uid) => {
        console.log('add user to chat:', uid);
    }
</script>