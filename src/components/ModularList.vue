<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  name: "ModularList",
  props: {
    list: {
      required: true,
    },
    onClick: {
      type: Function,
    },
  },
};
</script>
