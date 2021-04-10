<template>
  <div id="app">
    <div class="poe-node-demo">
      <div class="poe-node-showcase-demo">
        <poe-node-showcase id="node-demo" />
      </div>
      <div class="poe-node-demo-control-panel">
        <p>
          <label><b>Display mode: </b></label>
          <select @change="nodeDataUpdate" v-model="nodeDisplayMode">
            <option disabled value="">Please select one</option>
            <option>Icon</option>
            <option>Text</option>
            <option>Showcase</option>
          </select>
        </p>
        <p v-show="nodeDisplayMode != `Showcase`">
          <label><b>Custom label text: </b></label>
          <textarea
            @change="nodeDataUpdate"
            type="text"
            v-model="nodeCustomLabelText"
            rows="1"
          />
        </p>
        <p>
          <label><b>Show icon in showcase: </b></label>
          <input
            @change="nodeDataUpdate"
            type="checkbox"
            v-model="nodeShowIconInShowcase"
          />
        </p>
        <p>
          <label><b>Icon url</b></label>
          <br />
          <textarea @change="nodeDataUpdate" v-model="nodeIconUrl" rows="3" />
        </p>
        <p>
          <label><b>Node data</b></label>
          <br />
          <textarea @change="nodeDataUpdate" v-model="nodeData" rows="10" />
        </p>
      </div>
    </div>
    <div class="poe-node-demo">
      <div class="poe-item-showcase-demo">
        <poe-item-showcase id="item-demo" />
      </div>
      <div class="poe-item-demo-control-panel">
        <p>
          <label><b>Display mode: </b></label>
          <select @change="itemDataUpdate" v-model="itemDisplayMode">
            <option disabled value="">Please select one</option>
            <option>Icon</option>
            <option>Text</option>
            <option>Showcase</option>
          </select>
        </p>
        <p v-show="itemDisplayMode != `Showcase`">
          <label><b>Custom label text: </b></label>
          <textarea
            @change="itemDataUpdate"
            type="text"
            v-model="itemCustomLabelText"
            rows="1"
          />
        </p>
        <p>
          <label><b>Show icon in showcase: </b></label>
          <input
            @change="itemDataUpdate"
            type="checkbox"
            v-model="itemShowIconInShowcase"
          />
        </p>
        <p>
          <label><b>Icon url</b></label>
          <br />
          <textarea @change="itemDataUpdate" v-model="itemImageUrl" rows="3" />
        </p>
        <p>
          <label><b>Image size: </b></label>
          <select @change="itemDataUpdate" v-model="itemImageSize">
            <option disabled value="">Please select one</option>
            <option>auto</option>
            <option>sm</option>
            <option>md</option>
            <option>lg</option>
            <option>xlg</option>
          </select>
        </p>
        <p>
          <label><b>Node data</b></label>
          <br />
          <textarea @change="itemDataUpdate" v-model="itemData" rows="10" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PoeItemShowcase from "@/path-of-exile/components/poe-item-showcase.vue";
import PoeNodeShowcase from "@/path-of-exile/components/poe-node-showcase.vue";

export default {
  name: "App",
  components: {
    PoeItemShowcase,
    PoeNodeShowcase,
  },
  data() {
    return {
      nodeCustomLabelText: "",
      nodeDisplayMode: "Icon",
      nodeShowIconInShowcase: false,
      nodeData: `Type: Keystone
Acrobatics
--------
30% Chance to Dodge Attack Hits.
50% less Armour, 30% less Energy Shield, 30% less Chance to Block Spell and Attack Damage.`,
      nodeIconUrl:
        "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/1/1a/KeystoneAcrobatics_passive_skill_icon.png",

      itemCustomLabelText: "",
      itemDisplayMode: "Icon",
      itemShowIconInShowcase: false,
      itemImageSize: "auto",
      itemData: `Rarity: Unique
Replica Eternity Shroud
Blood Raiment
--------
Quality: +20% (augmented)
Evasion Rating: 1042 (augmented)
Energy Shield: 167 (augmented)
--------
Requirements:
Level: 80
Dex: 151
Int: 126
--------
Sockets: G-B-G-B-B B
--------
Item Level: 82
--------
Trigger Level 20 Shade Form when Hit
119% increased Evasion and Energy Shield
+96 to maximum Life
+20% to Chaos Resistance
Gain 5% of Physical Damage as Extra Chaos Damage per Elder Item Equipped
Hits ignore Enemy Monster Chaos Resistance if all Equipped Items are Elder Items
--------
"The form of this replica came to me in a troubled dream.
I do not believe we should ever allow it to be used."
- Researcher Arn
--------
Elder Item
--------
Has Perfidy Skin. You can reclaim this by shift-clicking this item.`,
      itemImageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/a0/The_Eternity_Shroud_inventory_icon.png`,
    };
  },
  methods: {
    nodeDataUpdate() {
      if (window.nodeShowcases) {
        window.nodeShowcases["node-demo"].applyOptions({
          nodeData: this.nodeData,
          iconUrl: this.nodeIconUrl,
          displayMode: this.nodeDisplayMode,
          showIconInShowcase: this.nodeShowIconInShowcase,
          labelText: this.nodeCustomLabelText,
        });
      }
    },
    itemDataUpdate() {
      if (window.itemShowcases) {
        window.itemShowcases["item-demo"].applyOptions({
          itemData: this.itemData,
          imageUrl: this.itemImageUrl,
          displayMode: this.itemDisplayMode,
          showIconInShowcase: this.itemShowIconInShowcase,
          labelText: this.itemCustomLabelText,
          imageSize: this.itemImageSize,
        });
      }
    },
  },
  mounted() {
    this.nodeDataUpdate();
    this.itemDataUpdate();
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: rgb(39, 39, 39);
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: row;
}
.poe-node-demo {
  display: flex;
  flex-direction: column;
  width: 50%;

  & .poe-node-demo-control-panel,
  & .poe-item-demo-control-panel {
    margin-left: 25px;
    margin-right: 25px;
    padding: 20px;
    & label {
      color: white;
      font: 400 13.3333px Arial;
      font-size: 16px;
    }
    & textarea {
      width: 100%;
    }
    & textarea,
    & select {
      margin-top: 10px;
      background-color: rgb(39, 39, 39);
      color: white;
    }
  }
  & .poe-node-showcase-demo,
  & .poe-item-showcase-demo {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 250px;
    margin-top: 20px;
    margin-bottom: 20px;

    & .poe-node-showcase,
    & .poe-item-showcase {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
