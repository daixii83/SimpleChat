<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-xl font-bold text-center text-white">Register</h2>
            <form @submit.prevent="register" class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight"
                        type="email" v-model="email" placeholder="Email" required
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight"
                        type="password" v-model="password" placeholder="Password" required />
                </div>
                <div class="flex justify-between">
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Register
                    </button>
                    <router-link
                        class="inline-block align-baseline font-bold text-sm text-primary-600 hover:text-primary-300"
                        to="/login"
                    >
                        Already have an account? Login
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('register succeed', userCredential.user);
    } catch (error) {
        console.log('register failed', error);
    }
}
</script>

<style scoped>
</style>