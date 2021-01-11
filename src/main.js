/*
This is the JavaScript file that is responsible for configuring the Vue.js
application. It is also used to register any third-party packages that the
application used or relies on,

*/
import Vue from "vue";
import App from "./App.vue";
import  "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
