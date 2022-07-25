<template>
  <nav class="nav">
    <div class="nav__section">
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-cloud-fog"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7 16a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12"
          />
          <line x1="5" y1="20" x2="19" y2="20" />
        </svg>
        <h1 class="heading--primary">Weather</h1>
      </div>
      <SearchBar class="nav__search-bar"></SearchBar>
    </div>
    <div class="nav__elements">
      <div class="nav__element">
        <p class="element__title">Favorite Cities</p>
        <ModularList
          :list="favoriteCities"
          @remove-item="removeItem"
          @set-item="setItem"
          class="element__list element__list--active"
        ></ModularList>
      </div>
      <div class="nav__element">
        <p class="element__title">Weather Preferences</p>
        <settings class="element__list element__list--active right"></settings>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ModularList from "./ModularList.vue";
import Settings from "./Settings.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "PrimaryNavigation",
  emits: ["remove-item", "set-item"],
  components: {
    ModularList,
    Settings,
    SearchBar,
  },
  methods: {
    removeItem(index) {
      console.log(index);
      this.$store.commit("removeCity", index);
    },
    setItem(index) {
      this.$store.commit("setCurrentCity", index);
      this.$store.dispatch("fetchWeather");
    },
  },
  computed: {
    ...mapState({
      favoriteCities: (state) => state.favoriteCities,
    }),
    ...mapMutations({
      removeCity: "removeCity",
    }),
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: colors.$primary-color;
  padding: 0.6rem 1.6rem;
  font-size: 1rem;

  &__section {
    display: flex;
    align-items: center;
    gap: 3.2rem;
    justify-content: space-between;
  }

  &__elements {
    display: flex;
    gap: 1.6rem;
  }

  &__search-bar {
    width: 100%;
  }
  .logo {
    display: flex;
    align-items: center;
    .icon-tabler {
      margin-right: 0.6rem;
    }
    .heading--primary {
      font-size: 1.6rem;
    }
  }
}

.nav__element {
  background-color: colors.$secondary-color;
  border: 1px solid colors.$transparent-color-neutral;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  &:hover {
    background-color: colors.$transparent-primary-color;
    border-color: colors.$accent-color;
    .element__list--active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .element__title {
    padding: 0.2rem 0.8rem;
  }
  .element__list {
    opacity: 0;
    pointer-events: none;
    cursor: default;
    background-color: colors.$secondary-color;
    border: 1px solid colors.$transparent-color-neutral;
    border-radius: 7px;
    position: absolute;
    padding: 0.2rem 0.8rem;
    // left: 0;
    top: 105%;
  }
  .right {
    left: -100%;
    transform: translate(25%, 0);
  }
}
</style>
