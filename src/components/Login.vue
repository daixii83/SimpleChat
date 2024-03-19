<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-2xl font-bold text-center text-white">Login</h2>
            <form
                @submit.prevent
                class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4"
            >
                <div class="mb-4">
                    <label class="block text-start text-white text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="rounded w-full py-2 px-3 bg-surface-300 text-white leading-tight"
                        :class="{ 'border border-red-500': !email && checkEmpty }"
                        type="email"
                        v-model="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div class="flex flex-col mb-6">
                    <label class="block text-start text-white text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <div class="relative">
                        <input
                            class="rounded w-full py-2 px-3 bg-surface-300 text-white leading-tight"
                            :class="{ 'border border-red-500': !password && checkEmpty }"
                            :type="passwordType"
                            v-model="password"
                            placeholder="Password"
                            required
                        />
                        <div
                            class="absolute right-2.5 bottom-1.5 cursor-pointer"
                            @click.stop="showPassword = !showPassword"
                        >
                            <font-awesome-icon
                                v-if="!showPassword"
                                :icon="['fas', 'eye']"
                                class="text-white"
                            />
                            <font-awesome-icon
                                v-if="showPassword"
                                :icon="['fas', 'eye-slash']"
                                class="text-white"
                            />
                        </div>
                    </div>
                    <router-link
                        class="flex justify-start items-center font-bold text-sm text-surface-500 hover:text-surface-600 p-2.5"
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
                        type="submit"
                        @click.stop="login"
                    >
                        <span v-if="isLoading" class="spinner"></span>
                        <span v-else>Login</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNotification } from '../stores/notification.js';
import { useRouter } from 'vue-router';
import { useAuth } from '../stores/auth.js';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const checkEmpty = ref(false);
const isLoading = ref(false);
const notification = useNotification();
const router = useRouter();
const authStore = useAuth();

const passwordType = computed(() => {
    return showPassword.value ? 'text' : 'password';
});

const login = async () => {
    isLoading.value = true;
    checkEmpty.value = true;
    if(email.value.trim() === '' || password.value.trim() === '') {
        this.isLoading = false;
        return;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        authStore.setUser(userCredential.user);
        router.push('/dashboard');
        notification.showNotification('登入成功');
    } catch (error) {
        console.log('user login failed', error.message);
        notification.showNotification(`登入失敗：${error.message}`);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
    .spinner {
        @apply inline-block w-4 h-4 border-2 border-solid rounded-full;
        border-color: currentColor;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>