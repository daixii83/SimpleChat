import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../stores/auth.js';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import ForgetPassword from '../components/ForgetPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';
import Register from '../components/Register.vue';
import ResendVerifyEmail from '../components/ResendVerifyEmail.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import EmailRedirect from '../components/EmailRedirect.vue';
import Dashboard from '../components/Dashboard.vue';
import Chat from '../components/Chat.vue';
import MySetting from '../components/MySetting.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgetPassword', name: 'ForgetPassword', component: ForgetPassword },
    { path: '/resetPassword', name: 'ResetPassword', component: ResetPassword },
    { path: '/register', name: 'Register', component: Register },
    { path: '/resendVerifyEmail', name: 'ResendVerifyEmail', component: ResendVerifyEmail },
    { path: '/verifyEmail', name: 'VerifyEmail', component: VerifyEmail },
    { path: '/emailRedirect', name: 'EmailRedirect', component: EmailRedirect },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, },
        children: [
            { path: 'chat', name: 'Chat', component: Chat, meta: { requiresAuth: true, }, },
            { path: 'mySetting', name: 'MySetting', component: MySetting, meta: { requiresAuth: true, }, },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();
    const requireAuth = to.matched.some((record) => record.meta.requireAuth);

    if(requireAuth && !auth.user) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;