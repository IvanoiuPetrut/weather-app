<template>
  <input
    type="text"
    @keyup="handleChange"
    @keyup.enter="setCity"
    v-model="searchText"
    placeholder="Enter city"
  />
  <search-list :list="this.searchList"></search-list>
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
