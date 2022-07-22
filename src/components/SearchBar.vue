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
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
    <div class="search__list">
      <SearchList
        :list="this.searchList"
        :isVisible="this.isVisible"
        @get-city="fetchAndResetWeather"
      ></SearchList>
    </div>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import { mapState } from "vuex";

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
    setCity(city) {
      this.$store.commit("setCity", city);
      console.log(`city` + this.$store.state.city);
    },
    setSearchCity(city) {
      this.$store.commit("setSearchCity", city);
    },
    fetchWeather() {
      this.$store.dispatch("fetchWeather");
    },
    fetchSearchList() {
      this.$store.dispatch("fetchSearchList");
    },
    clearCities() {
      this.$store.commit("clearCities");
    },
    clearSearchText() {
      this.searchText = "";
    },
    fetchAndResetWeather(city) {
      this.setCity(city);
      this.fetchWeather();
      this.clearSearchText();
      this.clearCities();
    },
    toggleVisibility() {
      // add a timer
      setTimeout(() => {
        this.isVisible = !this.isVisible;
      }, 400);
    },
  },
  computed: {
    ...mapState({
      searchList: (state) => state.searchCities,
    }),
  },
};
</script>

<style lang="scss" scoped>
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
    color: #000;
    height: 40px;
    width: 100%;
  }
  &__btn {
    width: 60px;
    height: 40px;
    background-color: #339af0;
    border: none;
    border-radius: 0 9px 9px 0;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    &:hover {
      background-color: #2072b5;
    }
    .icon {
      width: 1.4rem;
      color: #fff;
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
