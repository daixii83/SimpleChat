<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-xl font-bold text-center text-white">Reset Password</h2>
            <form @submit.prevent="resetPassword" class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-white text-start text-sm font-bold mb-2" for="password">
                        New Password
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight"
                        type="password" v-model="password" placeholder="Enter your new password" required
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold whitespace-nowrap py-2 px-4 rounded"
                        type="submit"
                    >
                        submit
                    </button>
                    <router-link
                        to="/login"
                        class="text-sm"
                    >
                        Back to Login
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase.js';
import { confirmPasswordReset } from 'firebase/auth';
import { useRoute, useRouter } from 'vue-router';
    const newPassword = ref('');
    const route = useRoute();
    const oobCode = route.query.oobCode;
    const router = useRouter();

    const resetPassword = async () => {
        try {
            await confirmPasswordReset(auth, oobCode, newPassword.value);
            showNotification('設定新密碼成功!');
            router.push('/login');
        } catch (error) {
            console.log('Password reset error:', error.message);
            showNotification(`設定新密碼失敗:${error.message}`);
        }
    }
</script>