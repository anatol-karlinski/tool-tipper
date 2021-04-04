<template>
  <div>
    <h2 style="color: white">Item stats</h2>
    <textarea
      class="item-stats-input-textarea"
      @change="emitValue"
      cols="50"
      rows="25"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "ItemStatsInput",
  props: {
    value: { type: String },
  },
  methods: {
    emitValue(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style>
.item-stats-input-textarea {
  background-color: black;
  color: white;
}
</style>
