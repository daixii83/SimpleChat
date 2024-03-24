<template>
    <div class="flex items-center justify-center min-h-full bg-surface-100">
        <div class="w-full max-w-xs">
            <h2 class="text-xl font-bold text-center text-white">Register</h2>
            <form
                @submit.prevent
                class="mt-8 bg-surface-200 rounded px-8 pt-6 pb-8 mb-4"
            >
                <!-- email -->
                <div class="mb-4">
                    <label class="block text-white text-start text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        class="rounded w-full py-2 px-3 bg-surface-300 text-white leading-tight"
                        :class="{ 'border border-red-500': !email && checkEmpty }"
                        type="email"
                        v-model="email"
                        @input="validateEmail"
                        placeholder="Email"
                        required
                    />
                    <p
                        v-if="emailError"
                        class="text-red-500 text-xs italic py-1"
                    >
                        {{ emailErrorText }}
                    </p>
                </div>
                <!-- password -->
                <div class="mb-4">
                    <label class="block text-white text-start text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <div class="relative">
                        <input
                            class="rounded w-full py-2 px-3 bg-surface-300 text-white text-sm leading-tight"
                            :class="{ 'border border-red-500': !password && checkEmpty }"
                            :type="passwordType"
                            v-model="password"
                            @input="validatePassword"
                            minLength="6"
                            maxLength="20"
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
                    <p
                        v-if="passwordError"
                        class="text-red-500 text-xs italic py-1"
                    >
                        {{ passwordErrorText }}
                    </p>
                </div>
                <!-- confirm password -->
                <div class="mb-8">
                    <label class="block text-white text-start text-sm font-bold mb-2" for="confirmPassword">
                        Confirm Password
                    </label>
                    <div class="relative">
                        <input
                            class="rounded w-full py-2 px-3 bg-surface-300 text-white text-sm leading-tight"
                            :class="{ 'border border-red-500': !confirmPassword && checkEmpty }"
                            :type="confirmPasswordType"
                            v-model="confirmPassword"
                            @input="validateConfirmPassword"
                            minLength="6"
                            maxLength="20"
                            placeholder="Confirm Password"
                            required
                        />
                        <div
                            class="absolute right-2.5 bottom-1.5 cursor-pointer"
                            @click.stop="showConfirmPassword = !showConfirmPassword"
                        >
                            <font-awesome-icon
                                v-if="!showConfirmPassword"
                                :icon="['fas', 'eye']"
                                class="text-white"
                            />
                            <font-awesome-icon
                                v-if="showConfirmPassword"
                                :icon="['fas', 'eye-slash']"
                                class="text-white"
                            />
                        </div>
                    </div>
                    <p
                        v-if="confirmPasswordError"
                        class="text-red-500 text-xs italic py-1"
                    >
                        {{ confirmPasswordErrorText }}
                    </p>
                </div>
                <div class="flex justify-between">
                    <router-link
                        class="max-w-40 flex items-center text-start font-bold text-sm text-primary-600 hover:text-primary-300"
                        to="/login"
                    >
                        Already have an account? Login
                    </router-link>
                    <button
                        class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-5 rounded"
                        type="submit"
                        @click.stop="register"
                    >
                        <span v-if="isLoading" class="spinner"></span>
                        <span v-else >Register</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useNotification } from '../stores/notification.js';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const confirmPasswordError = ref(false);
const emailErrorText = ref('');
const passwordErrorText = ref('');
const confirmPasswordErrorText = ref('');
const checkEmpty = ref(false);
const router = useRouter();
const user = ref(null);
const isLoading = ref(false);
const notification = useNotification();

const passwordType = computed(() => {
    return showPassword.value ? 'text' : 'password';
});
const confirmPasswordType = computed(() => {
    return showConfirmPassword.value ? 'text' : 'password';
});

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
// 驗證確認密碼
const validateConfirmPassword = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = true;
        confirmPasswordErrorText.value = 'Confirm password is required';
    } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = true;
        confirmPasswordErrorText.value = "Confirm password doesn't match";
    } else {
        confirmPasswordError.value = false;
        confirmPasswordErrorText.value = '';
    }
}

// 註冊+寄送驗證email
const register = async () => {
    isLoading.value = true;
    checkEmpty.value = true;
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (emailError.value || passwordError.value || confirmPasswordError.value) {
        isLoading.value = false;
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        user.value = userCredential.user;
        console.log(user.value);
        await sendEmailVerification(user.value);
        // 將使用者資料存入firestore資料庫
        await setDoc(doc(db, 'users', user.value.uid), {
            email: user.value.email,
            emailVerified: user.value.emailVerified,
            displayName: user.value.displayName,
            role: 'member',
        });

        router.push({ name: 'ResendVerifyEmail', query: { email: user.value.email, page: 'register' } });
    } catch (error) {
        console.log('register failed', error.message);
        notification.showNotification(`註冊失敗:${error.message}`);
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