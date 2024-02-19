<template>
    <div class="bg-surface-100 h-full flex flex-col justify-center items-center gap-2">
        <h1 class="text-4xl font-bold text-white">Simple Chat</h1>
        <p class="text-2xl text-gray-500">Chat in simple way.</p>
        <div class="flex justify-center items-center gap-1 py-2.5">
            <div class="bg-primary-500 rounded-3xl px-2 py-2.5 hover:bg-primary-600">
                <router-link class="mx-2 text-black font-semibold" to="/login">Login</router-link>
            </div>
            <router-link class="mx-2 text-primary-600 font-semibold hover:text-primary-300" to="/register">Register</router-link>
        </div>
    </div>
</template>