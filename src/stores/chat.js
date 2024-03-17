import { defineStore } from 'pinia';

export const useChat = defineStore('chat', {
    state: () => ({
        messages: [],
    }),
    actions: {
        sendMessage(message) {
            this.messages.push(message);
        }
    }
});