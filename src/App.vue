<template>
  <div id="app">
    <div style="width: 100%; display: flex">
      <item-showcase
        :showAsImage="true"
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
        :showAsImage="true"
        imageUrl="https://static.wikia.nocookie.net/pathofexile_gamepedia/images/8/85/Duskdawn_inventory_icon.png"
      >
        <pre style="display: none">
            Rarity: Unique
            Duskdawn
            Maelström Staff
            --------
            Warstaff
            Quality: +20% (augmented)
            Physical Damage: 71-147
            Critical Strike Chance: 6.80%
            Attacks per Second: 1.25
            Weapon Range: 13
            --------
            Requirements:
            Level: 70
            Str: 155
            Dex: 111
            Int: 155
            --------
            Sockets: R-B-R-B-R-G
            --------
            Item Level: 71
            --------
            Quality does not increase Physical Damage (enchant)
            Grants 1% increased Elemental Damage per 2% Quality (enchant)
            --------
            +25% Chance to Block Attack Damage while wielding a Staff (implicit)
            --------
            +10% Chance to Block Attack Damage while wielding a Staff
            67% increased Critical Strike Chance for Spells
            Gain 19% of Elemental Damage as Extra Chaos Damage
            +1% to Critical Strike Multiplier per 1% Chance to Block Attack Damage
            +60% to Critical Strike Multiplier if you've dealt a Non-Critical Strike Recently
            143% increased Spell Damage if you've dealt a Critical Strike Recently
            --------
            "The world is not simply black and white,
            it is not divided into good and evil.
            But black and white, good and evil, do exist,
            and we must know how to recognize them."
            - Archbishop Geofri
          </pre
        >
      </item-showcase>
      <item-showcase
        :showAsImage="true"
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
        :showAsImage="true"
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
:root {
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
</style>
