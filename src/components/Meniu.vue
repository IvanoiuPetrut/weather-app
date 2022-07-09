<template>
  <button @click="toggleMenu">
    <svg
      v-if="!isMenuOpen"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <svg
      v-if="isMenuOpen"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
  <div class="menu" :class="{ active: isMenuOpen }">
    <Settings></Settings>
    <ModularList :list="cities" @remove-item="removeItem"></ModularList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Settings from "./Settings.vue";
import ModularList from "./ModularList.vue";

export default {
  name: "MeniuHamburger",
  emits: ["remove-item"],
  components: {
    Settings,
    ModularList,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    removeItem(index) {
      console.log(index);
      this.$store.commit("removeCity", index);
    },
  },
  computed: {
    ...mapState({
      cities: (state) => state.cities,
    }),
    ...mapMutations({
      removeCity: "removeCity",
    }),
  },
};
</script>

<style lang="scss" scoped>
@mixin glass-morph($blur: 0.15) {
  background: rgba(255, 255, 255, $blur);
  box-shadow: 0 8px 32px 0 rgba(34, 34, 35, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.menu {
  @include glass-morph(0.3);
  display: inline-block;
  width: 20rem;
  height: 100vh;
  padding: 3.2rem 0.6rem 0.6rem 0.6rem;
  border-radius: 0;

  position: fixed;
  z-index: 999;
  top: 0;
  left: -20rem;

  transition: all 0.2s ease-in-out;
}
.active.menu {
  left: 0;
}

button {
  color: #fff;
  margin: 0.6rem;
  width: 2rem;
  background: none;
  border: none;
  cursor: pointer;

  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
