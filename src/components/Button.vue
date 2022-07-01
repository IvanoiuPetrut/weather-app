<template>
  <button>
    <slot>Button</slot>
  </button>
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
};
</script>
