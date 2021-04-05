<template>
  <div class="item-showcase">
    <slot name="item" class="item-showcase-data-slot"></slot>
    <div class="item-showcase-wrapper" v-if="options.displayAsTooltip">
      <v-popover trigger="hover" placement="auto" :offset="20">
        <a v-if="!showImage" :class="linkClassesComputed">{{
          linkTextComputed
        }}</a>
        <img v-else :width="linkImageSize" :src="options.imageUrl" />
        <template slot="popover">
          <item-showcase-tooltip
            v-if="showItem"
            :item="item"
            :imageUrl="options.imageUrl"
            :showImage="showTooltipImage"
            :imageSize="tooltipImageSize"
          />
        </template>
      </v-popover>
    </div>
    <div class="item-showcase-wrapper" v-else>
      <item-showcase-tooltip
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
import ItemShowcaseTooltip from "./ItemShowcaseTooltip.vue";
import processItemData from "./core-processor";
import axios from "axios";

const defaultOptions = {
  itemData: "",
  imageUrl: "",
  showLinkAsIcon: false,
  iconSize: "auto",
  linkClasses: "",
  linkText: "",
  displayAsTooltip: false,
  showIconInTooltip: false,
  iconInTooltipSize: "auto",
};

export default {
  name: "ItemShowcase",
  components: {
    ItemShowcaseTooltip,
  },
  props: {
    id: { type: String, required: true },
  },
  data: function () {
    return {
      options: { ...defaultOptions },
      item: {},
      showItem: false,
      imageAvalible: false,
      popperOptions: {
        defaultTrigger: "hover",
        popover: {
          defaultTrigger: "hover",
          defaultPlacement: "auto",
          defaultOffset: 20,
        },
      },
    };
  },
  mounted() {
    this.registerShowcase();
  },
  methods: {
    getImageSize(size) {
      if (size === "auto") {
        switch (this.item.type) {
          case "Equipment":
            return 120;
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
            return 120;
        }
      }
    },
    applyOptions(options) {
      this.options = {
        ...this.options,
        ...options,
      };
    },
    registerShowcase() {
      window.itemShowcases = window.itemShowcases || {};
      window.itemShowcases[this.id] = {
        instance: this,
        applyOptions: this.applyOptions,
      };
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
      return this.options.showLinkAsIcon && this.imageAvalible;
    },
    showTooltipImage() {
      return this.imageAvalible && this.options.showIconInTooltip;
    },
    linkImageSize() {
      return this.getImageSize(this.options.iconSize);
    },
    tooltipImageSize() {
      return this.getImageSize(this.options.iconInTooltipSize);
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: async function (options) {
        try {
          this.item = processItemData(options.itemData);
          this.showItem = true;
        } catch {
          this.showItem = false;
        }

        try {
          await axios.head(options.imageUrl);
          this.imageAvalible = true;
        } catch {
          this.imageAvalible = false;
        }
      },
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Fontin-SmallCaps";
  src: local("Fontin-SmallCaps"),
    url(../assets/Fontin-SmallCaps.ttf) format("truetype");
}
.item-showcase,
.vue-popover-theme {
  display: inline-block;
  text-align: center;
  font-family: "Fontin-SmallCaps", Verdana, Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  font-variant-ligatures: none;
  color: rgb(127, 127, 127);
  background-color: black;
  line-height: 24px;
  --poe-color-default: rgb(127, 127, 127);
  --poe-color-valuedefault: rgb(255, 255, 255);
  --poe-color-pink: rgb(255, 192, 203);
  --poe-color-dodgerblue: rgb(30, 144, 255);
  --poe-color-fire: rgb(150, 0, 0);
  --poe-color-cold: rgb(54, 100, 146);
  --poe-color-lightning: rgb(255, 215, 0);
  --poe-color-chaos: rgb(208, 32, 144);
  --poe-color-augmented: rgb(136, 136, 255);
  --poe-color-crafted: rgb(184, 218, 242);
  --poe-color-fractured: rgb(162, 145, 98);
  --poe-color-enchanted: rgb(184, 218, 242);
  --poe-color-unmet: rgb(210, 0, 0);
  --poe-color-uniqueitem: rgb(175, 96, 37);
  --poe-color-unique: rgb(175, 96, 37);
  --poe-color-rareitem: rgb(255, 255, 119);
  --poe-color-rare: rgb(255, 255, 119);
  --poe-color-magicitem: rgb(136, 136, 255);
  --poe-color-magic: rgb(136, 136, 255);
  --poe-color-whiteitem: rgb(200, 200, 200);
  --poe-color-normal: rgb(200, 200, 200);
  --poe-color-gemitem: rgb(27, 162, 155);
  --poe-color-gem: rgb(27, 162, 155);
  --poe-color-currencyitem: rgb(170, 158, 130);
  --poe-color-currency: rgb(170, 158, 130);
  --poe-color-questitem: rgb(74, 230, 58);
  --poe-color-quest: rgb(74, 230, 58);
  --poe-color-nemesismod: rgb(255, 200, 0);
  --poe-color-nemesismodoutline: rgb(219, 34, 0);
  --poe-color-talismanmod: rgb(141, 241, 79);
  --poe-color-talismanmodoutline: rgb(0, 0, 0);
  --poe-color-title: rgb(231, 180, 120);
  --poe-color-corrupted: rgb(210, 0, 0);
  --poe-color-favour: rgb(170, 158, 130);
  --poe-color-supporterpacknewitem: rgb(180, 96, 0);
  --poe-color-supporterpackitem: rgb(163, 141, 109);
  --poe-color-bloodlinemod: rgb(210, 0, 220);
  --poe-color-bloodlinemodoutline: rgb(58, 0, 125);
  --poe-color-tormentmod: rgb(50, 230, 100);
  --poe-color-tormentmodoutline: rgb(0, 78, 117);
  --poe-color-canttradeormodify: rgb(210, 0, 0);
  --poe-color-lockedtoaccount: rgb(210, 0, 0);
  --poe-color-divination: rgb(14, 186, 255);
  --poe-color-prophecy: rgb(181, 75, 255);
  --poe-color-essencemod: rgb(164, 210, 255);
  --poe-color-essencemodoutline: rgb(0, 41, 82);
  --poe-color-premiumchat: rgb(253, 242, 126);
  --poe-color-premiumchatoutline: rgb(209, 46, 46);
  --poe-color-uniquefoil: rgb(130, 173, 106);
  --poe-color-legacy: rgb(212, 145, 63);
  --poe-color-bestiarymod: rgb(255, 255, 255);
  --poe-color-bestiarymodoutline: rgb(219, 34, 0);
  --poe-color-blightmod: rgb(255, 255, 255);
  --poe-color-blightmodoutline: rgb(215, 0, 0);
  --poe-color-afflictionmod: rgb(22, 25, 28);
  --poe-color-afflictionmodoutline: rgb(151, 164, 181);
  --poe-color-stackitemlevel: rgb(255, 255, 255);
  --poe-color-harvestprimary: rgb(100, 111, 73);
  --poe-color-harvestsecondary: rgb(83, 130, 161);
  --poe-color-craftingcaster: rgb(179, 248, 254);
  --poe-color-craftingphysical: rgb(199, 157, 147);
  --poe-color-craftingfire: rgb(255, 154, 119);
  --poe-color-craftingcold: rgb(147, 216, 255);
  --poe-color-craftinglightning: rgb(248, 203, 118);
  --poe-color-craftingchaos: rgb(216, 167, 211);
  --poe-color-craftingspeed: rgb(207, 238, 165);
  --poe-color-craftingcrit: rgb(178, 167, 214);
  --poe-color-craftingred: rgb(200, 103, 110);
  --poe-color-craftingblue: rgb(162, 207, 251);
  --poe-color-craftinggreen: rgb(134, 189, 163);
  --poe-color-craftinglife: rgb(201, 110, 110);
  --poe-color-craftingdefences: rgb(168, 143, 103);
  --poe-color-craftingattack: rgb(218, 129, 77);
}
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
.item-showcase-data-slot {
  display: none;
}
.item-showcase-wrapper {
  display: flex;
}
</style>
