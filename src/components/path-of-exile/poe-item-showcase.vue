<template>
  <div class="poe-item-showcase">
    <div class="poe-item-showcase-wrapper" v-if="options.displayAsTooltip">
      <v-popover
        trigger="hover"
        placement="auto"
        :offset="20"
        :popoverClass="[`poe-item-showcase-popover`]"
      >
        <a v-if="!showImage" :class="linkClassesComputed">{{
          linkTextComputed
        }}</a>
        <img v-else :width="linkImageSize" :src="options.imageUrl" />
        <br />
        <div
          class="poe-showcase-label"
          v-show="options.showIconLabel && showImage && item.name"
        >
          {{ item.name }}
        </div>
        <template slot="popover">
          <poe-item-showcase-tooltip
            v-if="showItem"
            :item="item"
            :imageUrl="options.imageUrl"
            :showImage="showTooltipImage"
            :imageSize="tooltipImageSize"
          />
        </template>
      </v-popover>
    </div>
    <div class="poe-item-showcase-wrapper" v-else>
      <poe-item-showcase-tooltip
        v-if="showItem"
        :item="item"
        :imageUrl="options.imageUrl"
        :showImage="showTooltipImage"
        :imageSize="tooltipImageSize"
      />
    </div>
  </div>
</template>

<script>
import PoeItemShowcaseTooltip from "./poe-item-showcase-tooltip.vue";
import processItemData from "../../processors/poe-item-processor";
import itemShowacseMixin from "./../shared/item-showcase.mixin";

export default {
  name: "PoeItemShowcase",
  components: {
    PoeItemShowcaseTooltip,
  },
  mixins: [itemShowacseMixin],
  methods: {
    processItemData(rawDescription) {
      return processItemData(rawDescription);
    },
    getImageSize(size) {
      if (size === "auto") {
        switch (this.item.type) {
          case "Equipment":
            return 100;
          case "Flask":
            return 50;
          case "Gem":
            return 50;
          default:
            return 50;
        }
      } else {
        switch (size) {
          case "sm":
            return 30;
          case "md":
          default:
            return 50;
          case "lg":
            return 80;
          case "xlg":
            return 100;
        }
      }
    },
  },
  computed: {
    linkTextComputed() {
      return this.options.linkText ? this.options.linkText : this.item.name;
    },
    linkClassesComputed() {
      let classes = `${this.options.linkClasses} item-link`;
      if (this.item.rarity) {
        return (
          classes + ` item-link item-link-${this.item.rarity.toLowerCase()}`
        );
      }
      return classes;
    },
    showImage() {
      return this.options.showLinkAsIcon;
    },
    showTooltipImage() {
      return this.options.showIconInTooltip;
    },
    linkImageSize() {
      return this.getImageSize(this.options.iconSize);
    },
    tooltipImageSize() {
      return this.getImageSize(this.options.iconInTooltipSize);
    },
  },
};
</script>

<style lang="scss">
@use "./_styles" as styles;
.item-link-unique {
  color: var(--poe-color-unique);
}
.item-link-rare {
  color: var(--poe-color-rare);
}
.item-link-magic {
  color: var(--poe-color-magic);
}
.item-link-normal {
  color: var(--poe-color-normal);
}
.item-link-gem {
  color: var(--poe-color-gem);
}
.poe-item-showcase-wrapper {
  display: flex;
}
.poe-item-showcase-popover {
  background-color: black;
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.6);
  z-index: 10000;
}
.poe-item-showcase,
.poe-item-showcase-popover {
  display: inline-block;
  @include styles.font;
  @include styles.colors;
}
</style>
