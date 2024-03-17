import { defineStore } from "pinia";

export const useAuth = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser (user) {
            this.user = user;
        },
    },
});