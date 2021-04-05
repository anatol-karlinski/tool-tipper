<template>
  <div>
    <div :class="wrapperClasses">
      <!-- Header -->
      <div :class="headerClasses">
        <div :class="leftHeaderPanelClasses">
          <img v-if="item.influences.length > 0" />
        </div>
        <div class="item-header-center">
          <div>{{ itemName }}</div>
          <div v-if="itemHasSubname">{{ itemSubname }}</div>
        </div>
        <div :class="rightHeaderPanelClasses">
          <img v-if="item.influences.length > 0" />
        </div>
      </div>
      <!-- Item stats -->
      <div class="item-stats">
        <!-- Properties -->
        <div
          v-for="(property, index) in itemProperties"
          :key="`${index}-property`"
        >
          {{ property.key }}<span v-if="property.value">: </span>
          <span class="item-property-value" v-if="property.value">{{
            property.value
          }}</span>
        </div>
        <!-- Item level -->
        <div
          class="item-separator"
          v-if="itemHasLevel && itemProperties.length > 0"
        ></div>
        <div v-if="itemHasLevel">
          {{ itemLevel.text }}<span v-if="itemLevel.level">: </span>
          <span class="item-level-value" v-if="itemLevel.level">{{
            itemLevel.level
          }}</span>
        </div>
        <!-- Enchants -->
        <div class="item-separator" v-if="itemHasEnchants"></div>
        <div
          v-for="(enchant, index) in itemEnchants"
          :key="`${index}-enchant`"
          class="item-enchant"
        >
          {{ enchant }}
        </div>
        <!-- Implicits -->
        <div class="item-separator" v-if="itemHasImplicits"></div>
        <div
          v-for="(implicit, index) in itemImplicits"
          :key="`${index}-implicit`"
          class="item-implicit"
        >
          {{ implicit }}
        </div>
        <!-- Gem description -->
        <div class="item-separator" v-if="itemHasGemDescription"></div>
        <div
          v-for="(desciptionLine, index) in itemGemDescription"
          :key="`${index}-gem-desc`"
          class="gem-description"
        >
          {{ desciptionLine }}
        </div>
        <!-- Modifiers -->
        <div class="item-separator" v-if="itemHasModifiers"></div>
        <div
          v-for="(modifier, index) in itemModifiers"
          :key="`${index}-modifier`"
          :class="getModifierClasses(modifier)"
        >
          {{ modifier.text }}
        </div>
        <!-- Corruption -->
        <div class="item-corrupted" v-if="itemIsCorrupted">Corrupted</div>
        <!-- Mirrored -->
        <div class="item-mirrored" v-if="itemIsMirrored">Mirrored</div>
        <!-- Image -->
        <div class="item-separator" v-if="showTooltipImage"></div>
        <img
          class="item-image"
          :src="imageUrl"
          v-show="showTooltipImage"
          :width="imageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemShowcaseTooltip",
  props: {
    item: { type: Object, default: () => {} },
    imageUrl: { type: String, default: "" },
    imageSize: { type: Number, default: 50 },
    showImage: { type: Boolean, default: false },
  },
  methods: {
    getModifierClasses(modifier) {
      let classes = "item-modifier";
      if (modifier.isCrafter) {
        classes += " modifier-crafted";
      }

      return classes;
    },
  },
  computed: {
    showTooltipImage() {
      return this.showImage && this.imageUrl;
    },
    itemHeader() {
      return this.item.sections.find((x) => x.name === "Header");
    },
    itemName() {
      return this.itemHeader.lines[1];
    },
    itemSubname() {
      return this.itemHeader.lines.length > 1 ? this.itemHeader.lines[2] : "";
    },
    itemHasSubname() {
      return !!this.itemSubname;
    },
    itemLevel() {
      const itemLevelSection = this.item.sections.find(
        (x) => x.name === "Item level"
      );
      const itemLevelLine = itemLevelSection
        ? itemLevelSection.lines[0].split(":")
        : "";
      return itemLevelLine
        ? {
            text: itemLevelLine[0],
            level: itemLevelLine[1],
          }
        : void 0;
    },
    itemHasLevel() {
      return !!this.itemLevel;
    },
    itemProperties() {
      const properties = this.item.sections.find(
        (x) => x.name === "Properties"
      );
      return properties
        ? properties.lines.map((x) => {
            const propertyLine = x.split(":");
            const property = {
              key: propertyLine[0].replace(" (augmented)", "").trim(),
            };
            if (propertyLine.length > 1) {
              property.value = propertyLine[1]
                .replace(" (augmented)", "")
                .trim();
            }

            return property;
          })
        : [];
    },
    itemEnchants() {
      const enchantsSection = this.item.sections.find(
        (x) => x.name === "Enchants"
      );

      return enchantsSection
        ? enchantsSection.lines.map((x) => x.replace("(enchant)", "").trim())
        : [];
    },
    itemHasEnchants() {
      return this.itemEnchants && this.itemEnchants.length > 0;
    },
    itemImplicits() {
      const implicitSection = this.item.sections.find(
        (x) => x.name === "Implicits"
      );

      return implicitSection
        ? implicitSection.lines.map((x) => x.replace("(implicit)", "").trim())
        : [];
    },
    itemHasImplicits() {
      return this.itemImplicits && this.itemImplicits.length > 0;
    },
    itemModifiers() {
      const modifiersSection = this.item.sections.find(
        (x) => x.name === "Modifiers"
      );

      return modifiersSection
        ? modifiersSection.lines.map((x) => ({
            text: x.replace("(crafted)", "").trim(),
            isCrafter: x.includes("(crafted)"),
          }))
        : [];
    },
    itemHasModifiers() {
      return this.itemModifiers && this.itemModifiers.length > 0;
    },
    itemIsCorrupted() {
      return !!this.item.sections.some((x) => x.name === "Corruption status");
    },
    itemIsMirrored() {
      return !!this.item.sections.some((x) => x.name === "Mirrored status");
    },
    itemGemDescription() {
      const gemDescriptionSection = this.item.sections.find(
        (x) => x.name === "Gem description"
      );

      return gemDescriptionSection ? gemDescriptionSection.lines : [];
    },
    itemHasGemDescription() {
      return this.itemGemDescription && this.itemGemDescription.length > 0;
    },
    wrapperClasses() {
      let classes = "item-wrapper";
      if (this.item.rarity) {
        classes += ` ${this.item.rarity.toLowerCase()}-item`;
      }

      return classes;
    },
    headerClasses() {
      let classes = "item-header";
      if (this.item.rarity === "Rare" || this.item.rarity === "Unique") {
        classes += " item-header-double";
      } else {
        classes += " item-header-single";
      }

      return classes;
    },
    leftHeaderPanelClasses() {
      let classes = "item-header-left-panel";

      if (this.item.influences.length > 0) {
        classes += ` item-influenced item-influenced-${this.item.influences[0].toLowerCase()}`;
      }

      return classes;
    },
    rightHeaderPanelClasses() {
      let classes = "item-header-right-panel";

      if (this.item.influences.length > 0) {
        classes += " item-influenced";
      }

      if (this.item.influences.length === 1) {
        classes += ` item-influenced-${this.item.influences[0].toLowerCase()}`;
        return classes;
      }

      if (this.item.influences.length === 2) {
        classes += ` item-influenced-${this.item.influences[1].toLowerCase()}`;
        return classes;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.item-showcase,
.vue-popover-theme {
  .item-wrapper {
    min-width: 360px;
    border: 2px solid white;

    & .item-image {
      margin-top: 12px;
      margin-bottom: 4px;
    }
  }

  .item-header {
    white-space: nowrap;
    font-size: 22px;
    margin: 4px;
    display: flex;

    &.item-header-single {
      height: 32px;
      background-image: url(../assets/Item-ui-header-single.png);

      & .item-header-left-panel {
        background-image: url(../assets/Item-ui-header-single.png);
        width: 32px;
        &.item-influenced img {
          margin-top: 2px;
          position: absolute;
          margin-left: -5px;
        }
      }

      & .item-header-right-panel {
        background-image: url(../assets/Item-ui-header-single.png);
        width: 32px;
        background-position-x: -1px;

        &.item-influenced img {
          margin-top: 2px;
          position: relative;
          right: 6px;
        }
      }

      & .item-header-center {
        width: 100%;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;

        & div:nth-child(1) {
          margin-top: 4px;
        }
      }
    }

    &.item-header-double {
      height: 52px;
      background-image: url(../assets/Item-ui-header-double.png);

      & .item-header-left-panel {
        background-image: url(../assets/Item-ui-header-double.png);
        width: 40px;
      }

      & .item-header-right-panel {
        background-image: url(../assets/Item-ui-header-double.png);
        width: 40px;
        background-position-x: -8px;
      }

      & .item-header-center {
        width: 100%;
        line-height: 23px;
        & div:nth-child(1) {
          margin-top: 2px;
        }
      }

      & .item-influenced img {
        margin-top: 13px;
      }
    }
  }

  .modifier-crafted {
    color: var(--poe-color-essencemod) !important;
  }

  .gem-description {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    color: var(--poe-color-gem);
  }

  .item-property-value,
  .item-level-value {
    color: white;
  }

  .item-implicit,
  .item-modifier,
  .item-mirrored {
    color: var(--poe-color-augmented);
  }

  .item-enchant {
    color: var(--poe-color-essencemod);
  }

  .item-corrupted {
    color: var(--poe-color-corrupted);
  }

  .item-separator {
    height: 2px;
    background-repeat: no-repeat;
    background-position-x: center;
    margin-top: 4px;
    margin-bottom: 4px;
    background-image: url(./../assets/Item-ui-separators.png);
  }

  .item-stats {
    padding: 12px;
    padding-top: 4px;
  }

  .unique-item {
    &.item-wrapper {
      border-color: var(--poe-color-unique);
    }
    & .item-header {
      color: var(--poe-color-unique);
      background-position-y: 106px;
    }
    & .item-separator {
      background-position-y: -6px;
    }
    & .item-header-left-panel {
      background-position-y: 160px;
    }
    & .item-header-right-panel {
      background-position-y: 52px;
    }
  }

  .rare-item {
    &.item-wrapper {
      border-color: var(--poe-color-rare);
    }
    & .item-header {
      color: var(--poe-color-rare);
      background-position-y: -55px;
    }
    & .item-separator {
      background-position-y: -4px;
    }
    & .item-header-left-panel {
      background-position-y: -1px;
    }
    & .item-header-right-panel {
      background-position-y: -109px;
    }
  }

  .magic-item {
    &.item-wrapper {
      border-color: var(--poe-color-magic);
    }
    & .item-header {
      color: var(--poe-color-magic);
      background-position-y: 474px;
    }
    & .item-separator {
      background-position-y: -2px;
    }
    & .item-header-left-panel {
      background-position-y: 508px;
    }
    & .item-header-right-panel {
      background-position-y: 440px;
    }
  }

  .normal-item {
    &.item-wrapper {
      border-color: var(--poe-color-normal);
    }
    & .item-header {
      color: var(--poe-color-normal);
      background-position-y: 578px;
    }
    & .item-separator {
      background-position-y: -8px;
    }
    & .item-header-left-panel {
      background-position-y: 612px;
    }
    & .item-header-right-panel {
      background-position-y: 544px;
    }
  }

  .gem-item {
    &.item-wrapper {
      border-color: var(--poe-color-gem);
    }
    & .item-header {
      color: var(--poe-color-gem);
      background-position-y: 883px;
    }
    & .item-separator {
      background-position-y: -10px;
    }
    & .item-header-left-panel {
      background-position-y: 917px;
    }
    & .item-header-right-panel {
      background-position-y: 849px;
    }
  }

  .item-influenced-elder img {
    content: url(../assets/influence-icons/Elder.png);
  }
  .item-influenced-shaper img {
    content: url(../assets/influence-icons/Shaper.png);
  }
  .item-influenced-hunter img {
    content: url(../assets/influence-icons/Hunter.png);
  }
  .item-influenced-crusader img {
    content: url(../assets/influence-icons/Crusader.png);
  }
  .item-influenced-redeemer img {
    content: url(../assets/influence-icons/Redeemer.png);
  }
  .item-influenced-warlord img {
    content: url(../assets/influence-icons/Warlord.png);
  }
  .item-influenced-replica img {
    content: url(../assets/influence-icons/Replica.png);
  }
}
</style>
