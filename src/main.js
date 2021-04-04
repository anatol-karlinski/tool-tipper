import Vue from "vue";
import App from "./App.vue";
import VTooltip from "v-tooltip";

Vue.config.productionTip = false;

Vue.use(VTooltip, {
  defaultTrigger: "hover",
  popover: {
    defaultTrigger: "hover",
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
