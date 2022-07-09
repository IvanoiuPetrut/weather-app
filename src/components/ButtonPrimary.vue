<template>
  <button @click="action"><slot></slot></button>
</template>

<script>
export default {
  name: "ButtonPrimary",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
  methods: {
    action() {
      this.onClick();
    },
  },
};
</script>
