<template>
  <div id="app">
    <div class="poe-node-demo">
      <div class="poe-node-demo-control-panel">
        <p>
          <label for="nodedata">Node data</label>
          <br />
          <textarea id="nodedata" rows="6" type="text" name="nodedata" />
        </p>
        <p>
          <label for="iconurl">Icon url</label>
          <br />
          <input id="iconurl" type="text" name="iconurl" />
        </p>
        <p>
          <label for="labeltext">Cutom label text</label>
          <br />
          <input id="labeltext" type="text" name="labeltext" />
        </p>
        <p>
          <label for="movie">Display type</label>
          <br />
          <select id="movie" name="movie">
            <option>Icon</option>
            <option>Showcase</option>
            <option>Text</option>
          </select>
        </p>
      </div>
      <div class="poe-node-showcase-demo">
        <poe-node-showcase id="node-demo" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PoeItemShowcase from "./components/path-of-exile/poe-item-showcase.vue";
import LeItemShowcase from "./components/last-epoch/le-item-showcase.vue";
import PoeNodeShowcase from "./components/path-of-exile/poe-node-showcase.vue";

export default {
  name: "App",
  components: {
    PoeItemShowcase,
    LeItemShowcase,
    PoeNodeShowcase,
  },
  mounted() {
    try {
      window.nodeShowcases["node-demo"].applyOptions({
        displayMode: "text",
        showIconInShowcase: true,
        iconUrl:
          "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/1/1a/KeystoneAcrobatics_passive_skill_icon.png",
        nodeData: `
          Type: Keystone
          Acrobatics
          --------
          30% Chance to Dodge Attack Hits.
          50% less Armour, 30% less Energy Shield, 30% less Chance to Block Spell and Attack Damage.
      `,
      });
      window.itemShowcases["item-demo"].applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: true,
        showIconInTooltip: true,
        imageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/a0/The_Eternity_Shroud_inventory_icon.png`,
        itemData: `
          Rarity: Unique
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
          Has Perfidy Skin. You can reclaim this by shift-clicking this item.
`,
      });
    } catch {
      //no-op
    }
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: rgb(39, 39, 39);
  overflow: hidden;
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
}
.poe-node-demo {
  display: flex;
  flex-direction: row;
  height: 400px;
  & .poe-node-demo-control-panel {
    color: white;
    width: 50%;
    margin-left: 50px;
    margin-top: 21px;
    padding: 50px;
    padding-top: 0px;
    background-color: black;
    & input,
    & select,
    & textarea {
      width: 100%;
      background-color: black;
      color: white;
    }
  }
  & .poe-node-showcase-demo {
    width: 100%;
    display: flex;
    align-items: center;
    & .poe-node-showcase {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
