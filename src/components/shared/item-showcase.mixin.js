import defaultOptions from "./../default-options";

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
      handler: async function (options) {
        try {
          this.item = this.processItemData(options.itemData);
          this.showItem = true;
        } catch (e) {
          this.showItem = false;
          throw new Error(e);
        }
      },
    },
  },
};
