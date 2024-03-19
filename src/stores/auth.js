import { defineStore } from "pinia";
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

export const useAuth = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
    }),
    getters: {
        isAdmin: (state) => state.role == 'admin',
    },
    actions: {
        setUser (user) {
            this.user = user;
        },
        async fetchUserRole (user) {
            if(user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                this.role = userDoc.exists() ? userDoc.data().role : null;
            } else {
                this.role = null;
            }
        },
        signOut () {
            auth.signOut();
            this.user = null;
            this.role = null;
        }
    },
});

// 當當前使用者資訊改變時更新
onAuthStateChanged(auth, (user) => {
    console.log(user);
    const useAuthStore = useAuth();
    useAuthStore.setUser(user);
});