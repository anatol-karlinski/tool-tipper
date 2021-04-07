<template>
  <div>
    <div :class="wrapperClasses">
      <!-- Header -->
      <div class="node-header">
        <div class="node-header-left" />
        <div class="node-header-center">
          {{ nodeName }}
        </div>
        <div class="node-header-right" />
      </div>
      <!-- Description -->
      <div class="node-description">
        <div
          v-for="(descLine, index) in nodeDescription"
          :key="`${index}-desc-line`"
        >
          {{ descLine }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nodeShowcaseMixin from "./../shared/node-showcase.mixin";
import processNodeData from "../../processors/poe-node-processor";

export default {
  name: "PoeNodeShowcaseTooltip",
  mixins: [nodeShowcaseMixin],
  methods: {
    processNodeData(rawDescription) {
      return processNodeData(rawDescription);
    },
  },
  computed: {
    nodeName() {
      return "Kineticism";
    },
    nodeType() {
      return "Keystone";
    },
    nodeDescription() {
      return [
        "Attack Projectiles always inflict Bleeding and Maim, and Knock Back Enemies",
        "Projectiles cannot Pierce, Fork or Chain",
      ];
    },
    wrapperClasses() {
      let classes = `node-showcase-wrapper`;
      if (this.nodeType.length > 0) {
        classes += ` node-${this.nodeType.toLowerCase()}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
@use "./_styles" as styles;

.node-showcase-wrapper {
  @include styles.font;
  @include styles.colors;

  & .node-header {
    min-width: 176px;
    height: 53px;
    color: var(--poe-color-node-titel);
    display: flex;
    font-size: 20px;
    white-space: nowrap;
    background-image: url(../../assets/poe/Node-ui-header-small.png);

    & .node-header-center {
      justify-self: center;
      text-align: center;
      align-self: center;
      min-width: 48px;
      width: 100%;
    }
    & .node-header-left,
    & .node-header-right {
      width: 48px;
      background-image: url(../../assets/poe/Node-ui-header-small.png);
    }
  }

  &.node-basic {
    & .node-header {
      background-position-y: -898px;
      & .node-header-left {
        background-position-y: -792px;
      }
      & .node-header-right {
        background-position-y: -845px;
        background-position-x: -1px;
      }
    }
  }
  &.node-notable {
    & .node-header {
      background-position-y: -264px;
      & .node-header-left {
        background-position-y: -159px;
      }
      & .node-header-right {
        background-position-y: -211px;
        background-position-x: -1px;
      }
    }
  }
  &.node-keystone {
    & .node-header {
      color: #e2dedd !important;
      height: 52px;
      background-position-y: -106px;

      & .node-header-left {
        background-position-y: 0px;
      }
      & .node-header-right {
        background-position-y: -53px;
        background-position-x: -1px;
      }
    }
  }
  & .node-description {
    background-color: black;
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
    color: var(--poe-color-augmented);
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
