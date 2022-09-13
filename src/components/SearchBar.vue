<template>
  <div class="search">
    <div class="search__bar">
      <input
        type="text"
        class="search__input"
        placeholder="Enter city"
        v-model="searchText"
        @keyup.enter="fetchAndResetWeather(this.searchText)"
        @focus="toggleVisibility"
        @blur="toggleVisibility"
      />
      <button
        class="search__btn"
        @click="fetchAndResetWeather(this.searchText)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-search"
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
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </button>
    </div>
    <div>
      <SearchList
        class="search__list"
        :list="this.searchList"
        :isVisible="this.isVisible"
        @get-city="fetchAndResetWeather"
      ></SearchList>
    </div>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "SearchBar",
  components: {
    SearchList,
  },
  data() {
    return {
      searchText: "",
      isVisible: false,
    };
  },
  watch: {
    searchText() {
      if (this.searchText.length > 1) {
        this.setSearchCity(this.searchText);
        this.fetchSearchList();
      }
      if (this.searchText.length === 0) {
        this.clearCities();
        this.clearSearchText();
      }
    },
  },
  methods: {
    ...mapActions(["fetchWeather", "fetchSearchList"]),
    ...mapMutations(["setSearchCity", "clearCities", "setCity"]),

    clearSearchText() {
      this.searchText = "";
    },
    fetchAndResetWeather(city) {
      if (city.length > 1) {
        this.setCity(city);
        this.fetchWeather();
        this.clearSearchText();
        this.clearCities();
      }
    },
    toggleVisibility() {
      setTimeout(() => {
        this.isVisible = !this.isVisible;
      }, 400);
    },
  },
  computed: {
    ...mapState({
      searchList: (state) => state.searchCities,
      hourIndex: (state) => state.hourIndex,
    }),
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.search {
  height: 40px;
  width: 100%;

  &__bar {
    display: flex;
    position: relative;
  }
  &__input {
    border: none;
    border-radius: 9px 0 0 9px;
    padding: 0 10px;
    font-size: 1rem;
    background-color: colors.$secondary-color;
    color: colors.$accent-color;
    border: 1px solid colors.$transparent-color-neutral;
    height: 40px;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
  &__input::placeholder {
    color: colors.$text-color-secondary;
  }
  &__input:focus {
    box-shadow: none;
    border: 1px solid colors.$accent-color;
  }
  &__btn {
    width: 60px;
    height: 40px;
    background-color: colors.$secondary-color;
    border: none;
    border-radius: 0 9px 9px 0;
    border: 1px solid colors.$transparent-color-neutral;
    border-left: 0;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    &:hover {
      background-color: colors.$transparent-primary-color;
      border-color: colors.$accent-color;
    }
    .icon {
      width: 1.4rem;
      stroke: colors.$text-color;
      transform: rotate(90deg);
    }
  }
  &__list {
    position: absolute;
    width: 300px;
    z-index: 9999;
  }
}
</style>
