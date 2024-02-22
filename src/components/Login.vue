<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-2xl font-bold text-center text-white">Login</h2>
            <form @submit.prevent="login" class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-start text-white text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        type="email" v-model="email" placeholder="Email" required
                    />
                </div>
                <div class="flex flex-col mb-6">
                    <label class="block text-start text-white text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" v-model="password" placeholder="Password" required
                    />
                    <router-link
                        class="flex justify-start items-center font-bold text-sm text-surface-500 hover:text-surface-600 pl-2.5"
                        to="/forgetPassword"
                    >
                        Forget password?
                    </router-link>
                </div>
                <div class="flex justify-between">
                    <router-link
                        class="flex justify-center items-center font-bold text-sm text-primary-600 hover:text-primary-300"
                        to="/register"
                    >
                        No Account?<br>
                        Create One.
                    </router-link>
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                        type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
const email = ref('');
const password = ref('');

const login = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('user login succeed');
    } catch (error) {
        console.log('user login failed', error.message);
    }
}
</script>

<style scoped>
</style>