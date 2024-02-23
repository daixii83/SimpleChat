<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-xl font-bold text-center text-white">Forget Password</h2>
            <form @submit.prevent="sendResetEmail" class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-white text-start text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight"
                        type="email" v-model="email" placeholder="Enter your email" required
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold whitespace-nowrap py-2 px-4 rounded"
                        type="submit"
                    >
                        Send reset email
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
    import { sendPasswordResetEmail } from 'firebase/auth';
    const email = ref('');
    const sendResetEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, email.value);
            alert('Password reset email sent');
        } catch (error) {
            console.error('Reset password error:', error.message);
            alert('Error sending password reset email: ' + error.message);
        }
    }
</script>