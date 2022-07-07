<template>
  <div class="search">
    <div class="search__bar">
      <input
        type="text"
        class="search__input"
        @keyup="handleChange"
        @keyup.enter="setCity"
        v-model="searchText"
        placeholder="Enter city"
      />
      <button class="search__btn">
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
      <SearchList :list="this.searchList"></SearchList>
    </div>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchBar",
  components: {
    SearchList,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search() {
      this.$store.dispatch("search", this.searchText);
    },
    handleChange() {
      if (this.searchText.length > 1) {
        console.log(this.searchText);
        this.$store.commit("setSearchCity", this.searchText);
        this.$store.dispatch("fetchSearchList");
      }
    },
    setCity() {
      this.$store.commit("setCity", this.searchText);
      this.fetchWeather();
    },
    fetchWeather() {
      this.$store.dispatch("fetchForecast");
    },
  },
  computed: {
    ...mapGetters({
      searchList: "getSearchList",
    }),
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0.6rem 0 0 7.2rem;
  height: 40px;
  width: 300px;

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
    width: 40px;
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
  }
}
</style>
