Vue.createApp({
  data: () => ({
    show: null,
  }),
  computed: {
    showYes() {
      return this.show === "yes";
    },
    showNo() {
      return this.show === "no";
    },
  },
  methods: {
    clickYes() {
      this.show = "yes";
    },
    clickNo() {
      this.show = "no";
    },
  },
}).mount("#app");
