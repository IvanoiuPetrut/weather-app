<template>
  <ul
    v-if="this.searchCities && this.searchCities.length > 1 && this.isVisible"
    class="list"
  >
    <li
      class="list__element"
      v-for="(item, index) in list"
      :key="index"
      @click="getCity(item.name)"
    >
      {{ item.name }}, {{ item.region }}, {{ item.country }}
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SearchList",
  props: {
    list: {
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getCity(city) {
      this.$emit("get-city", city);
      console.log(city);
    },
  },
  computed: {
    ...mapState({
      searchCities: (state) => state.searchCities,
    }),
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.list {
  padding: 0.6rem;
  &__element {
    padding: 0.2rem 0.4rem;
    cursor: pointer;
    &:hover {
      color: colors.$accent-color;
    }
  }
}
</style>
