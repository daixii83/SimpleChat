<template>
    <div class="bg-surface-100 h-full flex flex-col justify-center items-center gap-2">
        <h1 class="text-2xl font-bold text-white">驗證成功。</h1>
        <p class="text-xl text-gray-500">繼續登入</p>
        <div class="flex justify-center items-center gap-1 py-2.5">
            <div class="bg-primary-500 rounded-3xl px-2 py-2.5 hover:bg-primary-600">
                <router-link class="mx-2 text-black font-semibold" to="/login">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'; 
    import { useRoute } from 'vue-router';
    import { auth } from '../firebase.js';
    import { applyActionCode } from 'firebase/auth';

    const route = useRoute();
    onMounted(() => {
        const oobCode = route.query.oobCode;

        applyActionCode(auth, oobCode)
        .then(() => {

        })
        .catch((error) => {
            console.log('驗證email失敗:', error);
        });
    });
</script>