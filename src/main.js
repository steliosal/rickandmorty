import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// FontAwesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleExclamation, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

// Add icons for global use in the application
library.add(faHeart, farHeart, faCircleExclamation);

// Create new Vue application instance
const app = createApp(App);

// Register FontAwesomeIcon component globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

// Mount the application to the DOM
app.mount("#app");
