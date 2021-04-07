<template>
  <div id="app">
    <div
      style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <!-- <poe-item-showcase id="test0" /> -->
      <!---<poe-item-showcase id="test1" />
      <poe-item-showcase id="test2" />
      <poe-item-showcase id="test3" />
      <poe-item-showcase id="test4" /> -->
      <poe-node-showcase id="nodeTest0" />
    </div>
    <div
      style="
        display: none;
        height: 2px;
        width: 100%;
        margin: 20px;
        border-top: 1px solid grey;
      "
    />
    <div
      style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <!-- <le-item-showcase id="test5" /> -->
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
      window.nodeShowcases.nodeTest0.applyOptions({
        showImage: true,
        imageUrl:
          "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/e/e7/Amplify_passive_skill_icon.png",
      });
      window.itemShowcases.test0.applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: false,
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
      window.itemShowcases.test1.applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: true,
        imageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/5/56/Harlequin_Mask_inventory_icon.png`,
        itemData: `
          Rarity: Rare
          Brood Halo
          Harlequin Mask
          --------
          Quality: +20% (augmented)
          Evasion Rating: 319 (augmented)
          Energy Shield: 63 (augmented)
          --------
          Requirements:
          Level: 70
          Str: 98
          Dex: 155
          Int: 73
          --------
          Sockets: G-G-R-B
          --------
          Item Level: 85
          --------
          Caustic Arrow has 20% chance to inflict Withered on Hit for 2 seconds base Duration (enchant)
          --------
          Grants Level 20 Aspect of the Spider Skill
          83% increased Evasion and Energy Shield
          +98 to maximum Life
          Regenerate 26 Life per second
          +47% to Lightning Resistance
          +1 to Level of Socketed AoE Gems (crafted)
          10% increased Area of Effect (crafted)
          --------
          Elder Item
          --------
          Has Assailum Skin. You can reclaim this by shift-clicking this item.
`,
      });
      window.itemShowcases.test2.applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: true,
        imageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/c/c9/Diamond_Flask_inventory_icon.png`,
        itemData: `
          Rarity: Magic
          Perpetual Diamond Flask of Warding
          --------
          Quality: +22% (augmented)
          Lasts 4.9 (augmented) Seconds
          Consumes 20 of 40 Charges on use
          Currently has 40 Charges
          Your Critical Strike Chance is Lucky
          --------
          Requirements:
          Level: 27
          --------
          Item Level: 72
          --------
          31% increased Charge Recovery
          Immune to Curses during Flask effect
          Removes Curses on use
`,
      });
      window.itemShowcases.test3.applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: true,
        imageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/e/e0/Medium_Cluster_Jewel_inventory_icon.png`,
        itemData: `
          Rarity: Normal
          Medium Cluster Jewel
          --------
          Item Level: 81
          --------
          Adds 5 Passive Skills (enchant)
          1 Added Passive Skill is a Jewel Socket (enchant)
          Added Small Passive Skills grant: 3% increased effect of Non-Curse Auras from your Skills (enchant)
`,
      });
      window.itemShowcases.test4.applyOptions({
        showLinkAsIcon: true,
        displayAsTooltip: true,
        imageUrl: `https://static.wikia.nocookie.net/pathofexile_gamepedia/images/4/48/Despair_inventory_icon.png`,
        itemData: `
          Rarity: Gem
          Anomalous Despair
          --------
          Spell, AoE, Duration, Chaos, Curse, Hex
          Level: 20 (Max)
          Mana Cost: 33
          Cast Time: 0.50 sec
          Quality: +20% (augmented)
          Alternate Quality
          --------
          Requirements:
          Level: 70
          Dex: 68
          Int: 98
          --------
          Curses all targets in an area, lowering their chaos resistance and increasing damage over time they take. All hits will deal added chaos damage to the cursed enemies.
          --------
          Base duration is 10.90 seconds
          Curse gains 10 Doom per second if you Cast this Spell yourself
          +10 to radius
          10% increased Effect of Curse
          Cursed enemies have -29% to Chaos Resistance
          Cursed enemies take 25% increased Damage from Damage Over Time effects
          Adds 46 to 57 Chaos Damage to Hits against Cursed Enemies
`,
      });
      window.itemShowcases.test5.applyOptions({
        showIconInTooltip: true,
        imageUrl: `https://lastepoch.tunklab.com/image/Call_of_the_Tundra.png`,
        itemData: `
          Rarity: Unique
          Call of the Tundra
          Helmet
          Unique Gladiator Helmet
          --------
          +130 Armor
          --------
          Requirements:
          Level: 74
          --------
          +1 to Level of Warcry
          Warcry is Converted to Cold
          Converts stun to freeze, physical damage to cold damage, and bleed to frostbite.
          Warcry no longer knocks enemies back
          +100 Health
          +18 Health Regen
          18 Health Gain on Freeze
`,
      });
    } catch {
      // no-op
    }
  },
};
</script>

<style lang="scss">
body {
  background-color: grey;
  overflow: hidden;
}
.poe-item-showcase {
  margin-top: auto;
}
.poe-item-showcase-wrapper {
  margin: 20px;
}
</style>
