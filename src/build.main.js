import Vue from "vue";
import PoeItemShowcase from "./components/path-of-exile/poe-item-showcase.vue";
import PoeNodeShowcase from "./components/path-of-exile/poe-node-showcase.vue";

import VTooltip from "v-tooltip";
import vueCustomElement from "vue-custom-element";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(vueCustomElement);

Vue.customElement("poe-item-showcase", PoeItemShowcase);
Vue.customElement("poe-node-showcase", PoeNodeShowcase);
