import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import ForgetPassword from '../components/ForgetPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';
import Register from '../components/Register.vue';
import ResendVerifyEmail from '../components/ResendVerifyEmail.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import EmailRedirect from '../components/EmailRedirect.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgetPassword', name: 'ForgetPassword', component: ForgetPassword },
    { path: '/resetPassword', name: 'ResetPassword', component: ResetPassword },
    { path: '/register', name: 'register', component: Register },
    { path: '/resendVerifyEmail', name: 'resendVerifyEmail', component: ResendVerifyEmail },
    { path: '/verifyEmail', name: 'verifyEmail', component: VerifyEmail },
    { path: '/emailRedirect', name: 'emailRedirect', component: EmailRedirect },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;