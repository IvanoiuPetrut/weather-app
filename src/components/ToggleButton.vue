<template>
  <div class="btn-group">
    <button
      class="btn btn--toggle btn--left"
      :class="{ active: isOptionOneActive }"
      @click="toggle"
    >
      {{ firstOption }}
    </button>
    <button
      class="btn btn--toggle btn--right"
      :class="{ active: !isOptionOneActive }"
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
    isOptionOneActive: {
      type: Boolean,
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
  methods: {
    toggle() {
      this.onClick();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.btn--toggle {
  padding: 0.2rem 0.6rem;
  color: colors.$text-color;
  background-color: colors.$secondary-color;
  transition: all 0.15s ease-in-out;
  border: 1px solid colors.$transparent-color-neutral;
}

.btn--toggle:hover {
  background-color: colors.$transparent-primary-color;
  border-color: colors.$accent-color;
}

.btn--right {
  border-radius: 0 7px 7px 0;
}

.btn--left {
  border-radius: 7px 0 0 7px;
}

.active {
  background-color: colors.$transparent-primary-color;
  border-color: colors.$accent-color;
}
</style>
