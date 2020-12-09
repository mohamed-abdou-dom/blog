require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueProgressBar from "vue-progressbar";
import Vuex from 'vuex';
import {routes} from './routes';
import StoreData from './store';
import MainApp from './components/MainApp.vue';
import {initialize} from './helpers/general';
import { Form, HasError, AlertError } from "vform";
import moment from "moment";
import CKEditor from '@ckeditor/ckeditor5-vue2';

// ckeditor
Vue.use( CKEditor );

// vue-router
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: 'history'
});

// vuex
Vue.use(Vuex);
const store = new Vuex.Store(StoreData);
initialize(store, router);

// vue-progressbar
const options = {
    color: "#ffffff",
    failedColor: "#ffffff",
    thickness: "8px",
    transition: {
        speed: "0.2s",
        opacity: "0.8s",
        termination: 300
    },
    autoRevert: true,
    location: "top",
    inverse: false
};
Vue.use(VueProgressBar, options);

// vform
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;

// filters
Vue.filter("capitalize", function (text) {
    if (text != null) {return text.charAt(0).toUpperCase() + text.slice(1);}
});
Vue.filter("myDate", function (created) {
    return moment(created).format("MMMM Do YYYY"); // July 21st 2020, 2:42:27 pm
});

// Slug
window.Slug = require("slug");
Slug.defaults.mode = "rfc3986";

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});