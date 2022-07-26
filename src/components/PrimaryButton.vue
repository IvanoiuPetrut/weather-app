<template>
  <div class="btn__wrapper">
    <button
      @click="action"
      @mouseover="toggleHover"
      @mouseout="toggleHover"
      class="btn"
    >
      <slot></slot>
    </button>
    <span :class="{ active: isHovering }" class="tooltip">{{ tooltip }}</span>
  </div>
</template>

<script>
export default {
  name: "ButtonPrimary",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    tooltip: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isHovering: false,
    };
  },
  methods: {
    action() {
      this.onClick();
    },
    toggleHover() {
      this.isHovering = !this.isHovering;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.btn__wrapper {
  display: inline-block;
  position: relative;
  border-radius: 11px;
}
.btn {
  color: colors.$text-color;
  border: 1px solid colors.$transparent-color-neutral;
  background-color: none;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 11px;
  transition: all 0.3s ease-in-out;
  z-index: 999;
  &:hover {
    border-color: colors.$accent-color;
    background-color: colors.$transparent-primary-color;
    transform: scale(1.1);
  }
}

.tooltip {
  opacity: 0;
  pointer-events: none;
  color: colors.$text-color;
  background-color: colors.$secondary-color;
  border: 1px solid colors.$transparent-color-neutral;
  border-radius: 7px;
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
  z-index: 99;
  position: absolute;
  right: 50%;
  transform: translate(50%, 10%);
}

.active.tooltip {
  opacity: 1;
  transform: translate(50%, -130%);
}
</style>
