<template>
  <p>the list</p>
  <ul>
    items
    <li v-for="(item, index) in list" :key="index">
      {{ item }}
    </li>
  </ul>
  <!-- <p>{{ this.$store.state.autocomplete }}</p> -->
</template>

<script>
export default {
  name: "SearchList",
  props: {
    list: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
</style>
