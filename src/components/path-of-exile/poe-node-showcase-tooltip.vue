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
      <!-- Icon -->
      <div v-if="showTooltipIcon" class="node-icon">
        <img :style="`background-image: url(${this.nodeIcon})`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoeNodeShowcaseTooltip",
  props: {
    node: { type: Object, default: () => {} },
  },
  computed: {
    nodeName() {
      return this.node ? this.node.name : "";
    },
    nodeType() {
      return this.node ? this.node.type : "";
    },
    nodeDescription() {
      return this.node ? this.node.description : [];
    },
    nodeIcon() {
      return this.options ? this.options.imageUrl : "";
    },
    showTooltipIcon() {
      return this.options && this.options.imageUrl && this.options.showImage;
    },
    wrapperClasses() {
      let classes = `node-showcase-wrapper`;
      if (this.nodeType) {
        classes += ` node-${this.nodeType.toLowerCase()}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.node-showcase-wrapper {
  background-color: black;
  & .node-header {
    min-width: 176px;
    height: 73px;
    color: var(--poe-color-node-titel);
    display: flex;
    font-size: 28px;
    white-space: nowrap;
    background-image: url(../../assets/poe/Node-ui-header.png);
    & .node-header-center {
      justify-self: center;
      text-align: center;
      align-self: center;
      min-width: 100px;
      width: 100%;
    }
    & .node-header-left,
    & .node-header-right {
      width: 98px;
      background-image: url(../../assets/poe/Node-ui-header.png);
    }
  }
  & .node-icon {
    padding-top: 12px;
    padding-bottom: 25px;
  }
  &.node-basic {
    & .node-header {
      background-position-y: -1278px;
      & .node-header-left {
        background-position-y: -1203px;
      }
      & .node-header-right {
        background-position-y: -1128px;
      }
    }
    & .node-icon {
      & img {
        content: url(../../assets/poe/Basic_passive_frame.png);
        background-size: 35px;
        background-position-x: 14px;
        background-position-y: 14px;
        background-repeat: no-repeat;
        width: 62px;
      }
    }
  }

  &.node-notable {
    & .node-header {
      background-position-y: -377px;
      & .node-header-left {
        background-position-y: -302px;
      }
      & .node-header-right {
        background-position-y: -227px;
      }
    }
    & .node-icon {
      & img {
        content: url(../../assets/poe/Notable_passive_frame.png);
        background-position-x: 14px;
        background-position-y: 14px;
        background-repeat: no-repeat;
        background-size: 47px;
        width: 75px;
      }
    }
  }
  &.node-keystone {
    & .node-header {
      color: #e2dedd !important;
      background-position-y: -152px;
      & .node-header-left {
        background-position-y: -77px;
      }
      & .node-header-right {
        background-position-y: -2px;
      }
    }
    & .node-icon {
      & img {
        content: url(../../assets/poe/Keystone_passive_frame.png);
        background-position-x: 18px;
        background-position-y: 18px;
        background-repeat: no-repeat;
        background-size: 52px;
        width: 90px;
      }
    }
  }
  & .node-description {
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
    color: var(--poe-color-augmented);
    font-size: 18px;
    line-height: 22px;
  }
}
</style>
