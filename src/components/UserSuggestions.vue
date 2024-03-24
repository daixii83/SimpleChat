<template>
    <div>
        <h2>Suggested Users</h2>
        <ul>
            <li
                v-for="user in suggestedUsers"
                :key="user.uid"
            >
                {{ user.name }}
                <!-- add btn -->
                <div
                    class="cursor-pointer"
                    @click="emitAddUserEvent"
                >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
            </li>
        </ul>
    </div>    
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { auth, db } from '../firebase';
    import { collection, getDocs, query, limit } from 'firebase/firestore';

    const suggestedUsers = ref([]);
    const emit = defineEmits(['add-user']);

    onMounted(async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, limit(5));
            const querySnapshot = await getDocs(q);
            // 從 firestore 取得 collection 內的資料 => .data()
            suggestedUsers.value = querySnapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error("Error in mounted:", error);
        }
    });

    const emitAddUserEvent = (uid) => {
        emit('add-user', uid);
    }
</script>