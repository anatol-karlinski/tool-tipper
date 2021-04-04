<template>
  <div class="item-showcase-wrapper">
    <slot class="item-showcase-data-slot"></slot>
    <v-popover>
      <a v-if="!showImage" :class="linkClasses">{{ item.name }}</a>
      <img v-else width="50" :src="imageUrl" />
      <template slot="popover">
        <item-showcase-tooltip v-if="showItem" :item="item" />
      </template>
    </v-popover>
  </div>
</template>

<script>
import ItemShowcaseTooltip from "./ItemShowcaseTooltip.vue";
import processItemData from "./core-processor";
import axios from "axios";

export default {
  name: "ItemShowcase",
  components: {
    ItemShowcaseTooltip,
  },
  props: {
    imageUrl: { type: String, default: "" },
    showAsImage: { type: Boolean, default: false },
    linkClasses: { type: String, default: "" },
  },
  data: function () {
    return {
      item: {},
      showItem: false,
      tooltipOptions: {
        trigget: "hover",
      },
      imageAvalible: false,
    };
  },
  mounted() {
    try {
      const itemData = this.$slots.default[0].children[0].text;
      this.item = processItemData(itemData);
      this.showItem = true;
    } catch (e) {
      this.showItem = false;
    }
  },
  computed: {
    itemNameClasses() {
      return `${this.linkClasses} item-link`;
    },
    showImage() {
      return this.showAsImage && this.imageAvalible;
    },
  },
  watch: {
    imageUrl: {
      immediate: true,
      handler: async function (value) {
        try {
          await axios.head(value);
          this.imageAvalible = true;
        } catch {
          this.imageAvalible = false;
        }
      },
    },
  },
};
</script>

<style>
.item-showcase-data-slot {
  display: none;
}
.item-showcase-wrapper {
  display: flex;
}
</style>
