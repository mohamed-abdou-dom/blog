import Welcome from './components/Welcome.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Home from './components/Pages/Home.vue';
import SingleArticle from './components/Pages/SingleArticle.vue';
import NewArticle from './components/Pages/NewArticle.vue';

export const routes = [
    {
        path: '/',
        component: Welcome,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/article/:slug',
        component: SingleArticle,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/new-article',
        component: NewArticle,
        meta: {
            requiresAuth: true
        }
    },
    // {
    //     path: '/customers',
    //     component: CustomersMain,
    //     meta: {
    //         requiresAuth: true
    //     },
    //     children: [
    //         {
    //             path: '/',
    //             component: CustomersList
    //         },
    //         {
    //             path: 'new',
    //             component: NewCustomer
    //         },
    //         {
    //             path: ':id',
    //             component: Customer
    //         }
    //     ]
    // }
];
