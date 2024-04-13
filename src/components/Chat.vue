<template>
    <div class="flex h-full bg-surface-100">
        <div class="w-1/4 p-4 border-r border-surface-300">
            <UserSuggestions @add-user="addUserToChat" />
        </div>
        <div class="flex flex-col w-3/4 p-4">
            <div class="flex-1 flex flex-col gap-3 overflow-auto bg-surface-200 p-4 mb-4 rounded-lg">
                <div v-for="message in messages" :key="message.id" class="flex"
                    :class="{ 'justify-start': message.sender != auth.user.uid, 'justify-end': message.sender == auth.user.uid }">
                    <div class="flex flex-col gap-1">
                        <div class=" text-start"><strong> {{ message.name }} </strong>:</div>
                        <div class="bg-surface-300 rounded-md px-4 py-2"
                            :class="{ 'bg-mixed-300': message.sender == auth.user.uid }">
                            {{ message.text }}
                        </div>
                    </div>
                </div>
            </div>
            <form class="flex items-center gap-2" @submit.prevent="sendMessage">
                <input class="flex-1 p-2 rounded-lg border border-surface-300 bg-surface-200 text-white"
                    v-model="newMessage" type="text" placeholder="type a message..." />
                <button class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                    type="submit">
                    send
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import UserSuggestions from './UserSuggestions.vue';
import { useAuth } from '../stores/auth.js';

const messages = ref([]);
const newMessage = ref('');
const messageRef = collection(db, 'publicChat');
const auth = useAuth();

onMounted(() => {
    const q = query(messageRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        messages.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    });
    onUnmounted(() => unsubscribe());
});

const sendMessage = async () => {
    if (newMessage.value.trim()) {
        const currentUser = auth.user;
        await addDoc(messageRef, {
            sender: currentUser.uid,
            name: currentUser.displayName != null ? currentUser.displayName : 'Anonymous',    // 預設匿名
            text: newMessage.value,
            timestamp: new Date()
        });
        newMessage.value = '';
    }
};

const addUserToChat = (uid) => {
    console.log('add user to chat:', uid);
}
</script>