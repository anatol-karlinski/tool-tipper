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
      <item-showcase
        :showLinkAsIcon="false"
        :displayAsTooltip="true"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/8/84/Orb_of_Storms_inventory_icon.png"
      >
        <pre style="display: none">
          Rarity: Gem
          Orb of Storms
          --------
          Lightning, Spell, Duration, AoE, Chaining, Orb
          Level: 20 (Max)
          Mana Cost: 16
          Cooldown Time: 0.50 sec
          Cast Time: 0.50 sec
          Critical Strike Chance: 5.00%
          Effectiveness of Added Damage: 65%
          --------
          Requirements:
          Level: 70
          Int: 155
          --------
          Creates a stationary electrical orb that frequently unleashes a splitting bolt of lightning at a nearby enemy. Modifiers to cast speed will increase how frequently it does this. Using a lightning skill while inside the orb's cloud unleashes additional bolts. Casting this skill again will replace the previous orb.
          --------
          Deals 185 to 555 Lightning Damage
          Base duration is 6.00 seconds
          Strikes every 1.02 seconds
          Beams Split towards 4 additional targets
          --------
          Place into an item socket of the right colour to gain this skill. Right click to remove from a socket.
          </pre
        >
      </item-showcase>
      <item-showcase
        :showLinkAsIcon="false"
        :displayAsTooltip="true"
        iconSize="md"
        iconInTooltipSize="md"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/5/59/Lapis_Amulet_inventory_icon.png"
      >
        <pre style="display: none">
          Rarity: Rare
          Rift Scarab
          Lapis Amulet
          --------
          Quality (Attack Modifiers): +20% (augmented)
          --------
          Requirements:
          Level: 64
          --------
          Item Level: 85
          --------
          Allocates Vengeant Cascade (enchant)
          --------
          +30 to Intelligence (implicit)
          --------
          Adds 14 to 31 Physical Damage to Attacks
          19% increased Global Critical Strike Chance
          +34% to Global Critical Strike Multiplier
          +42% to Fire Resistance
          Gain 4% of Non-Chaos Damage as extra Chaos Damage
          +54 to maximum Life (crafted)
          --------
          Elder Item
          </pre
        >
      </item-showcase>
      <item-showcase
        :showLinkAsIcon="false"
        :displayAsTooltip="true"
        iconSize="lg"
        linkText="The Claw"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/6/6c/Noble_Claw_inventory_icon.png"
      >
        <pre style="display: none">
          Rarity: Rare
          Carrion Roar
          Noble Claw
          --------
          Claw
          Physical Damage: 25-66 (augmented)
          Elemental Damage: 10-119 (augmented)
          Critical Strike Chance: 6.00%
          Attacks per Second: 1.60
          Weapon Range: 11
          --------
          Requirements:
          Level: 54
          Dex: 105
          Int: 73
          --------
          Sockets: B B
          --------
          Item Level: 100
          --------
          +40 Life gained for each Enemy hit by Attacks (implicit)
          --------
          18% increased Physical Damage
          Adds 10 to 119 Lightning Damage
          +17 to Accuracy Rating
          15% chance to gain Unholy Might for 3 seconds on Kill
          Attacks with this Weapon Penetrate 7% Lightning Resistance
          --------
          Crusader Item
          Warlord Item
          </pre
        >
      </item-showcase>
      <item-showcase
        :showLinkAsIcon="false"
        :displayAsTooltip="true"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/c/c9/Diamond_Flask_inventory_icon.png"
      >
        <pre style="display: none">
            Rarity: Magic
            Chemist's Diamond Flask of the Order
            --------
            Quality: +20% (augmented)
            Lasts 4.8 (augmented) Seconds
            Consumes 16 (augmented) of 40 Charges on use
            Currently has 40 Charges
            Your Critical Strike Chance is Lucky
            --------
            Requirements:
            Level: 48
            --------
            Item Level: 78
            --------
            20% reduced Charges used
            76% increased Critical Strike Chance during Flask Effect (crafted)
            --------
            Lucky means that a number is rolled twice and the best result is picked. Right click to drink. Can only hold charges while in belt. Refills as you kill monsters.
          </pre
        >
      </item-showcase>
      <item-showcase
        :showLinkAsIcon="false"
        :displayAsTooltip="true"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/a0/Reach_of_the_Council_inventory_icon.png"
      >
        <pre style="display: none">
          Rarity: Unique
          Reach of the Council
          Spine Bow
          --------
          Bow
          Quality: +30% (augmented)
          Physical Damage: 100-324 (augmented)
          Critical Strike Chance: 6.50%
          Attacks per Second: 1.54 (augmented)
          --------
          Requirements:
          Level: 80
          Dex: 212
          Int: 126
          --------
          Sockets: B-G-G-G-G-G
          --------
          Item Level: 85
          --------
          Socketed Gems are Supported by Level 20 Greater Volley
          69% increased Physical Damage
          Adds 24 to 85 Physical Damage
          10% increased Attack Speed
          20% reduced Projectile Speed
          Arrows fired from the first firing points always Pierce
          Arrows fired from the second firing points Fork
          Arrows fired from the third firing points Return to you
          Arrows fired from the fourth firing points Chain +2 times
          --------
          We stand together. We strike together.
          --------
          Corrupted
          </pre
        >
      </item-showcase>
    </div>
  </div>
</template>

<script>
import ItemShowcase from "./components/ItemShowcase.vue";
import processItem from "./components/core-processor";

export default {
  name: "App",
  components: {
    ItemShowcase,
  },
  data: function () {
    return {
      rawItemData: "",
      itemData: {},
      showItem: false,
    };
  },
  watch: {
    rawItemData(value) {
      try {
        this.itemData = processItem(value);
        this.showItem = true;
      } catch {
        this.showItem = false;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: black;
}
.item-showcase-wrapper {
  margin: 20px;
}
</style>
