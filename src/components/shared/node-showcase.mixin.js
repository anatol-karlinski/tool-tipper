import defaultOptions from "../default-node-options";

export default {
  data: function () {
    return {
      options: { ...defaultOptions },
      node: {},
      showNode: false,
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
      window.nodeShowcases = window.nodeShowcases || {};
      window.nodeShowcases[this.id] = {
        instance: this,
        applyOptions: this.applyOptions,
      };
    },
    processNodeData() {
      throw new Error();
    },
  },
  watch: {
    options: {
      immediate: false,
      handler: function (options) {
        try {
          this.node = this.processNodeData(options.nodeData);
          this.showNode = true;
        } catch (e) {
          this.showNode = false;
          throw new Error(e);
        }
      },
    },
  },
};
