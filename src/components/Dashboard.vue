<template>
    <div class="flex h-full bg-surface-100 p-10">
        <div class="w-64 bg-surface-200 rounded-l-md flex flex-col justify-between">
            <div class="flex-1 flex flex-col">
                <nav class="flex-1 p-4">
                    <ul class="space-y-4">
                        <li>
                            <router-link
                                class="block p-2 text-white rounded hover:bg-surface-300"
                                to="/dashboard"
                            >Home</router-link>
                        </li>
                        <li>
                            <router-link
                                class="block p-2 text-white rounded hover:bg-surface-300"
                                to="/dashboard/chat"
                            >Chat</router-link>
                        </li>
                    </ul>
                </nav>
                <div
                    class="p-4 mt-auto cursor-pointer hover:"
                    @click="goToSetting"
                >
                    <font-awesome-icon :icon="['fas', 'gear']" />
                </div>
            </div>
            <div
                class="block p-2 text-white rounded"
                @click="logout"
            >
                <font-awesome-icon
                    :icon="['fas', 'right-from-bracket']"
                    class="cursor-pointer"
                />
            </div>
        </div>
        <div class="flex-1 bg-surface-300 rounded-r-md p-4 overflow-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { useAuth } from '../stores/auth';
    const user = useAuth();

    const router = useRouter();
    const goToSetting = () => {
        router.push('/mySetting');
    }
    const logout = async () => {
        try {
            user.signOut();
            router.push('/login');
        } catch(error) {
            console.log('登出失敗:', error);
        }
    }
</script>