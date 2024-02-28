<template>
    <div
        class="flex items-center justify-center min-h-full bg-surface-100"
    >
        <p class="text-2xl text-white">重新導向...</p>
    </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const mode = route.query.mode;
    const oobCode = route.query.oobCode;
    console.log(mode, oobCode);

    const handleAction = async () => {
        try {
            switch(mode) {
                case 'verifyEmail':
                    router.push({ name: 'verifyEmail', query: { oobCode: oobCode } });
                    break;
                case 'resetPassword':
                    router.push({ name: 'resetPassword', query: { oobCode: oobCode } });
                    break;
            }
        } catch (error) {
            console.log('導向失敗:', error.message);
            showNotification(`重新導向失敗:${error.message}`);
        }
    }

    handleAction();
</script>