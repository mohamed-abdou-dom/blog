window._ = require('lodash');

window.Popper = require('popper.js').default;
try {
    window.$ = window.JQuery =require('jquery');
    require('bootstrap');
} catch (error) {}

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '047897bd86f1e6455293',
    cluster: 'eu',
    forceTLS: true
});
