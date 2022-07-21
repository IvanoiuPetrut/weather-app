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
  background-color: greenyellow;
  border-radius: 11px;
}
.btn {
  color: colors.$primary-color;
  background-color: colors.$text-color;
  font-size: 1rem;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 11px;
  transition: all 0.3s ease-in-out;
  z-index: 999;
  &:hover {
    transform: scale(1.1);
  }
}

.tooltip {
  opacity: 0;
  pointer-events: none;
  color: colors.$primary-color;
  background-color: colors.$text-color;
  border-radius: 7px;
  padding: 0rem 0.2rem;
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
  transform: translate(50%, -120%);
}
</style>
