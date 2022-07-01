<template>
  <div class="btn-group">
    <button
      class="btn btn--toggle btn--left"
      :class="{ active: optionOneIsActive }"
      @click="toggle"
    >
      {{ firstOption }}
    </button>
    <button
      class="btn btn--toggle btn--right"
      :class="{ active: optionTwoIsActive }"
      @click="toggle"
    >
      {{ secondOption }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    firstOption: {
      type: String,
      required: true,
    },
    secondOption: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      optionOneIsActive: true,
      optionTwoIsActive: false,
    };
  },
  methods: {
    toggle() {
      this.optionOneIsActive = !this.optionOneIsActive;
      this.optionTwoIsActive = !this.optionTwoIsActive;
      this.onClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--toggle {
  padding: 0.2rem 0.6rem;
  background-color: #fff;
  transition: all 0.15s ease-in-out;
}

.btn--toggle:hover {
  background-color: #339af0;
  color: #fff;
}

.btn--right {
  border-radius: 0 7px 7px 0;
}

.btn--left {
  border-radius: 7px 0 0 7px;
}

.active {
  background-color: #339af0;
  color: #fff;
}
</style>
