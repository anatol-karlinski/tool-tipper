<template>
  <div class="poe-node-showcase">
    <div class="poe-node-showcase-wrapper" v-if="options.displayAsTooltip">
      <v-popover
        trigger="hover"
        placement="auto"
        :popoverClass="[`poe-node-showcase-popover`]"
      >
        <div v-if="options.showImage">
          <poe-node-image :type="node.type" :imageUrl="options.imageUrl" />
          <span
            v-show="options.showIconLabel && options.showImage && node.name"
          >
            <div>{{ node.name }}</div>
            <div class="poe-node-showcase-node-name">{{ node.type }}</div>
          </span>
        </div>
        <a v-else :class="linkClassesComputed">{{ linkTextComputed }}</a>

        <template slot="popover">
          <poe-node-showcase-tooltip
            v-if="showNode"
            :node="node"
            :imageUrl="options.imageUrl"
            :showImage="options.showIconInTooltip"
          />
        </template>
      </v-popover>
    </div>
    <div class="poe-node-showcase-wrapper" v-else>
      <poe-node-showcase-tooltip
        v-if="showNode"
        :node="node"
        :imageUrl="options.imageUrl"
        :showImage="options.showIconInTooltip"
      />
    </div>
  </div>
</template>

<script>
import PoeNodeShowcaseTooltip from "./poe-node-showcase-tooltip.vue";
import PoeNodeImage from "./poe-node-image.vue";
import nodeShowcaseMixin from "./../shared/node-showcase.mixin";
import processNodeData from "../../processors/poe-node-processor";

export default {
  name: "PoeNodeShowcase",
  mixins: [nodeShowcaseMixin],
  components: { PoeNodeShowcaseTooltip, PoeNodeImage },
  methods: {
    processNodeData(rawDescription) {
      return processNodeData(rawDescription);
    },
  },
  computed: {
    linkClassesComputed() {
      let classes = `${this.options.linkClasses} node-link`;

      if (this.node && this.node.type) {
        return classes + ` node-link node-link-${this.node.type.toLowerCase()}`;
      }
      return classes;
    },
    linkTextComputed() {
      return this.options.linkText
        ? this.options.linkText
        : this.node
        ? this.node.name
        : "";
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

  .poe-node-showcase-node-name {
    line-height: 12px;
    font-size: 12px;
  }
  .node-link {
    color: var(--poe-color-node-title);
  }
}
</style>
