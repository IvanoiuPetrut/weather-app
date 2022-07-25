<template>
  <ul>
    <li class="item" v-for="(item, index) in list" :key="index">
      {{ item }} <button @click="removeItem(index)">Remove</button>
      <button @click="setItem(index)">Set City</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ModularList",
  emits: ["remove-item", "set-item"],
  props: {
    list: {
      required: true,
    },
  },
  methods: {
    setItem(index) {
      this.$emit("set-item", index);
    },
    removeItem(index) {
      this.$emit("remove-item", index);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

ul {
  background-color: colors.$primary-color;
}
.item {
  color: #fff;
}
</style>
