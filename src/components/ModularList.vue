<template>
  <ul>
    <li class="item" v-for="(item, index) in list" :key="index">
      {{ item }} <button @click="removeItem(index)">remove</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ModularList",
  emits: ["remove-item"],
  props: {
    list: {
      required: true,
    },
  },
  methods: {
    setItem(item) {
      this.$emit("set-item", item);
    },
    removeItem(index) {
      this.$emit("remove-item", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  color: #fff;
}
</style>
