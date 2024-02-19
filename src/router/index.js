import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import ForgetPassword from '../components/ForgetPassword.vue';
import Register from '../components/Register.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgetPassword', name: 'ForgetPassword', component: ForgetPassword },
    { path: '/register', name: 'register', component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;