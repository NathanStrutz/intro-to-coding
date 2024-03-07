let YesButton = {
  template: `<button @click="$emit('do')">Yes!</button>`,
  emits: ["do"]
};

let NoButton = {
  template: `<button @click="$emit('do')">No!</button>`,
  emits: ["do"]
};

let AnswerArea = {
  template: `
    <div>
      <p v-if="show === 'yes'">Yeah, me too.</p>
      <p v-if="show === 'no'">Oh really? How sad.</p>
    </div>`,
  props: ["show"],
};

Vue.createApp({
  template: `
    <YesButton @do="show = 'yes'" />
    <NoButton @do="show = 'no'" />

    <AnswerArea id="answers" :show="show" />
  `,
  components: {
    YesButton,
    NoButton,
    AnswerArea,
  },
  data: () => ({
    show: null,
  }),
}).mount("#app");
