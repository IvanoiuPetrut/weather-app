<template>
  <ul>
    <li
      class="item"
      v-for="(item, index) in list"
      :key="index"
      @click="setItem(index)"
    >
      <p class="item__content">{{ item }}</p>
      <button @click="removeItem(index)" class="btn">Remove</button>
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
  display: flex;
  flex-direction: column;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  &__content {
    color: colors.$text-color;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    &:hover {
      color: colors.$accent-color;
    }
  }

  .btn {
    padding: 0.2rem 0.4rem;
    border-radius: 7px;
    border: 1px solid colors.$transparent-color-neutral;
    color: colors.$text-color;
    transition: all 0.15s ease-in-out;
    &:hover {
      color: colors.$red;
      background-color: colors.$red-transparent;
      border-color: colors.$red;
    }
  }
}
</style>
