<template>
    <div class="bg-surface-100 h-full flex flex-col justify-center items-center gap-8">
        <h2 class="text-2xl font-bold text-white">
            註冊成功！ 已經發送email至: {{ email }}
        </h2>
        <div class="flex flex-col gap-4">
            <p class="text-xl text-white">沒有收到驗證信嗎？</p>
            <button
                class="bg-primary-500 hover:bg-primary-600 text-black font-bold py-2 px-4 rounded"
                :disabled="isBtnDisabled"
                @click.stop="resendVerificationEmail"
            >
                <p
                    v-if="isBtnDisabled"
                    class="text-black"
                >
                    請等待 {{ countdown }} 秒後可再次發送。
                </p>
                <p v-else>重新發送</p>
            </button>
            <div class="flex justify-center">
                <router-link
                    class="max-w-40 flex items-center text-start font-bold text-base text-primary-600 hover:text-primary-300"
                    to="/login"
                >
                    返回登入頁面
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'; 
    import { auth } from '../firebase.js';
    import { sendEmailVerification } from 'firebase/auth';
    import { useNotification } from '../stores/notification.js';
    
    const route = useRoute();
    const email = route.query.email;
    const pageType = route.query.page ? route.query.page : null;
    const isBtnDisabled = ref(false);
    const countdown = ref(60);
    const notification = useNotification();

    const resendVerificationEmail = async () => {
        try {
            const user = auth.currentUser;
            console.log(user);
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
            notification.showNotification(`已發送驗證信至:${email}`);
        } catch(error) {
            console.log('Error resending verification email:', error);
            notification.showNotification(`發送驗證信失敗:${error.message}`);
        }
    }

    onMounted(() => {
        console.log(pageType);
        // firebase限制60秒發一次驗證信，註冊跳轉後要先開始計時
        if(pageType == 'register') {
            isBtnDisabled.value = true;
            const timer = setInterval(() => {
                countdown.value--;
                if(countdown.value === 0) {
                    clearInterval(timer);
                    isBtnDisabled.value = false;
                }
            }, 1000);
        }
    });
</script>