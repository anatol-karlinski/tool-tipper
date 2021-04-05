<template>
  <div class="le-item-showcase">
    <div class="item-icon-column"></div>
    <div class="item-text-column">
      <img
        :src="options.imageUrl"
        v-if="options.imageUrl && options.showIconInTooltip"
      />
      <div v-show="hasHeader">----------------</div>
      <div
        v-show="hasHeader"
        v-for="(line, index) in headerLines"
        :key="`${index}-header`"
      >
        {{ line }}
      </div>
      <div v-show="hasProperties">----------------</div>
      <div
        v-show="hasProperties"
        v-for="(line, index) in propertyLines"
        :key="`${index}-property`"
      >
        {{ line }}
      </div>
      <div v-show="hasModifiers">----------------</div>
      <div
        v-show="hasModifiers"
        v-for="(line, index) in modifierLines"
        :key="`${index}-modifier`"
      >
        {{ line }}
      </div>
      <div v-show="hasRequirements">----------------</div>
      <div
        v-show="hasRequirements"
        v-for="(line, index) in requirementLines"
        :key="`${index}-requirement`"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script>
import processItemData from "./../../item-processors/le-item-processor";
import itemShowacseMixin from "./../shared/item-showcase.mixin";

export default {
  name: "LeItemShowcase",
  mixins: [itemShowacseMixin],
  methods: {
    processItemData(rawDescription) {
      return processItemData(rawDescription);
    },
  },
  computed: {
    hasHeader() {
      return this.headerLines && this.headerLines.length > 0;
    },
    headerLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Header").lines.slice(1)
        : [];
    },
    hasProperties() {
      return this.propertyLines && this.propertyLines.length > 0;
    },
    propertyLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Properties").lines
        : [];
    },
    hasModifiers() {
      return this.modifierLines && this.modifierLines.length > 0;
    },
    modifierLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Modifiers").lines
        : [];
    },
    hasRequirements() {
      return this.requirementLines && this.requirementLines.length > 0;
    },
    requirementLines() {
      return this.item.sections
        ? this.item.sections.find((x) => x.name === "Requirements").lines
        : [];
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Cinzel-VariableFont";
  src: local("Cinzel-VariableFont"),
    url(../../assets/le/Cinzel-VariableFont.ttf) format("truetype");
}
.le-item-showcase {
  font-family: "Cinzel-VariableFont", Verdana, Arial, Helvetica, sans-serif;
  background-color: var(--le-panel-background);
  color: var(--le-value-text);
  border: 2x solid var(--le-panel-border);
  padding: 4px;
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.6);

  --le-panel-background: #0a0a09;
  --le-panel-border: #0a0a09;
  --le-property-text: #baad8c;
  --le-value-text: #bfb4a3;
  --le-adnotation-text: #929292;
  --le-rarity-rare: #d0bc48;
}
</style>
