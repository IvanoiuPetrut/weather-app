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
* {
  color: #fff;
}

@mixin glass-morph {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(34, 34, 35, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  @include glass-morph();
  @include flex-column();
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.6rem;
  &__element {
    padding: 0.2rem 0.4rem;
    cursor: pointer;
    &:hover {
      color: #339af0;
    }
  }
}
</style>
