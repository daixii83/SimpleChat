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
                        type="email"
                        v-model="email"
                        @input="validateEmail"
                        placeholder="Email"
                        required
                    />
                    <p
                        v-if="emailError"
                        class="text-red-500 text-xs italic"
                    >
                        {{ emailErrorText }}
                    </p>
                </div>
                <div class="mb-6">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight"
                        type="password"
                        v-model="password"
                        @input="validatePassword"
                        minLength="6"
                        maxLength="20"
                        placeholder="Password"
                        required
                    />
                    <p
                        v-if="passwordError"
                        class="text-red-500 text-xs italic"
                    >
                        {{ passwordErrorText }}
                    </p>
                </div>
                <div class="flex justify-between">
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                        type="submit"
                        :disabled="emailErrorText || passwordErrorText || registerErrorText"
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
import { ref } from 'vue';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const emailError = ref(false);
const passwordError = ref(false);
const emailErrorText = ref('');
const passwordErrorText = ref('');
const registerErrorText = ref('');
const router = useRouter();
const user = ref(null);

// 驗證email
const validateEmail = () => {
    const emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!email.value) {
        emailError.value = true;
        emailErrorText.value = 'email is required';
    } else if (!emailRule.test(email.value)) {
        emailError.value = true;
        emailErrorText.value = 'please enter a valid email';
    } else {
        emailError.value = false;
        emailErrorText.value = '';
    }
}
// 驗證密碼
const validatePassword = () => {
    if(!password.value) {
        passwordError.value = true;
        passwordErrorText.value = 'Password is required';
    } else if (password.value.length < 6 || password.value.length > 20) {
        passwordError.value = true;
        passwordErrorText.value = 'Password must be 6-20 characters';
    } else {
        passwordError.value = false;
        passwordErrorText.value = '';
    }
}

// 註冊+寄送驗證email
const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        user.value = userCredential.user;
        await sendEmailVerification(user);
        console.log('register succeed', userCredential.user);
        router.push({ name: 'resendVerifyEmail', query: { email: user.value.email } });
    } catch (error) {
        console.log('register failed', error.message);
        showNotification(`註冊失敗:${error.message}`);
    }
}
</script>

<style scoped>
</style>