import defaultOptions from "@/shared/default-options/default-showcase-options";

export default {
  data: function () {
    return {
      options: { ...defaultOptions },
      item: {},
      showItem: false,
    };
  },
  props: {
    id: { type: String, required: true },
    wrapperClass: { type: String, default: "" },
    tooltipWrapperClass: { type: String, default: "" },
  },
  mounted() {
    this.registerShowcase();
  },
  methods: {
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
    processItemData() {
      throw new Error();
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function (options) {
        try {
          this.item = this.processItemData(options.itemData);
          this.showItem = true;
        } catch (e) {
          this.showItem = false;
        }
      },
    },
  },
};
