import { defineStore } from "pinia";

export const useNotification = defineStore('notification', {
    state: () => ({
        message: '',
    }),
    actions: {
        showNotification(message) {
            this.message = message;
            this.isVisible = true;
            setTimeout(() => {
                this.isVisible = false;
            }, 3000);
        }
    }
});