//import './assets/main.css'

import { createApp } from 'vue'
// import { createAuth0 } from '@auth0/auth0-vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'
import store from './store'; // Import your Vuex store

const app = createApp(App);
app.use(store); // Use the Vuex store
app.use(router);
// app.use(
//     createAuth0({
//         domain: "dev-1m3o05aqle0uh438.us.auth0.com",
//         clientId: "bF6CfOSGf6Sb0hCVTddUv5wBbVuqSIln",
//         authorizationParams: {
//             redirect_uri: window.location.origin
//         }
//     })
// );
app.mount('#app');