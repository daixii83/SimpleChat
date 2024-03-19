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
            </li>
        </ul>
    </div>    
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { db } from '../firebase';
    import { collection, getDocs, query, limit } from 'firebase/firestore';

    const suggestedUsers = ref([]);

    onMounted(async () => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, limit(5));
        const querySnapshot = await getDocs(q);
        // 從 firestore 取得 collection 內的資料 => .data()
        suggestedUsers.value = querySnapshot.docs.map(doc => doc.data());
    });
</script>