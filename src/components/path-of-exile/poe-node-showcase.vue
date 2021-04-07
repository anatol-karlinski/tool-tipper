<template>
  <div class="poe-node-showcase">
    <div class="poe-node-showcase-wrapper" v-if="options.displayAsTooltip">
      <v-popover
        trigger="hover"
        placement="auto"
        :offset="20"
        :popoverClass="[`poe-node-showcase-popover`]"
      >
        <a v-if="!showImage" :class="linkClassesComputed">{{
          linkTextComputed
        }}</a>
        <img v-else :width="linkNodeSize" :src="options.imageUrl" />
        <br />
        <span v-show="options.showIconLabel && showImage && node.name">
          {{ item.name }}
        </span>
        <template slot="popover">
          <poe-node-showcase-tooltip
            v-if="showNode"
            :node="node"
            :imageUrl="options.imageUrl"
            :showImage="showTooltipImage"
            :imageSize="tooltipImageSize"
          />
        </template>
      </v-popover>
    </div>
    <div class="poe-node-showcase-wrapper" v-else>
      <poe-node-showcase-tooltip
        v-if="showNode"
        :node="node"
        :imageUrl="options.imageUrl"
      />
    </div>
  </div>
</template>

<script>
import PoeNodeShowcaseTooltip from "./poe-node-showcase-tooltip.vue";
import nodeShowcaseMixin from "./../shared/node-showcase.mixin";
import processNodeData from "../../processors/poe-node-processor";

export default {
  name: "PoeNodeShowcase",
  mixins: [nodeShowcaseMixin],
  components: { PoeNodeShowcaseTooltip },
  methods: {
    processNodeData(rawDescription) {
      return processNodeData(rawDescription);
    },
  },
};
</script>

<style lang="scss">
@use "./_styles" as styles;
.poe-node-showcase-popover,
.poe-node-showcase {
  @include styles.font;
  @include styles.colors;
}
</style>
