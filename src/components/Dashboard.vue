<template>
    <div class="flex h-full bg-surface-100 p-10">
        <div class="w-64 bg-surface-200 flex flex-col justify-between">
            <div>
                <nav class="p-4">
                    <ul class="space-y-4">
                        <li>
                            <router-link
                                class="block p-2 text-white rounded hover:bg-surface-300"
                                to="/dashboard"
                            >home</router-link>
                        </li>
                        <li>
                            <router-link
                                class="block p-2 text-white rounded hover:bg-surface-300"
                                to="/dashboard/chat"
                            >chat</router-link>
                        </li>
                    </ul>
                </nav>
                <div
                    class="p-4 cursor-pointer"
                    @click="goToSetting"
                >
                    <font-awesome-icon :icon="['fas', 'gear']" />
                </div>
            </div>
            <div
                class="block p-2 text-white rounded hover:bg-surface-300"
                @click="logout"
            >
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </div>
        </div>
        <div class="flex-1 bg-surface-300 p-4 overflow-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const goToSetting = () => {
        router.push('/mySetting');
    }
    const logout = () => {
        router.push('/login');
    }
</script>