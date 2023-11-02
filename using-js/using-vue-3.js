let YesButton = {
  template: `<button @click="$emit('do')">Yes!</button>`,
};

let NoButton = {
  template: `<button @click="$emit('do')">No!</button>`,
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
    <yes-button @do="show = 'yes'" />
    <no-button @do="show = 'no'" />

    <answer-area id="answers" :show="show" />
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
