<template>
    <div class="bg-surface-100 h-full flex flex-col justify-center items-center gap-2">
        <h2 class="text-4xl font-bold text-white">
            註冊成功！ 已經發送email至: {{ email }}
        </h2>
        <div class="">
            <p class="text-2xl text-white">沒有收到驗證信嗎？</p>
            <button
                class="br-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                :disabled="isButtonDisabled"
                @click.stop="resendVerificationEmail"
            >
                重新發送
            </button>
            <p
                v-if="isButtonDisabled"
                class="text-2xl text-white"
            >
                請等待 {{ countDown }} 秒後可再次發送。
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router'; 
    import { auth } from '../firebase.js';
    import { sendEmailVerification } from 'firebase/auth';
    
    const route = useRoute();
    const email = route.query.email;
    const isBtnDisabled = ref(false);
    const countdown = ref(60);

    const resendVerificationEmail = async () => {
        try {
            const user = await auth.getUserByEmail(email);
            await sendEmailVerification(user);
            isBtnDisabled.value = true;
            countdown.value = 60;
            const timer = setInterval(() => {
                countdown.value--;
                if(countdown.value === 0) {
                    clearInterval(timer);
                    isBtnDisabled.value = false;
                }
            }, 1000);
            showNotification(`已發送驗證信至:${email}`);
        } catch(error) {
            console.log('Error resending verification email:', error);
            showNotification(`發送驗證信失敗:${error.message}`);
        }
    }
</script>