import Vue from "vue";
import ItemShowcase from "./components/ItemShowcase.vue";
import VTooltip from "v-tooltip";
import vueCustomElement from "vue-custom-element";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(vueCustomElement);

Vue.customElement("item-showcase", ItemShowcase);
