<template>
  <input
    type="text"
    @keyup.enter="setCity"
    v-model="searchText"
    placeholder="Enter city"
  />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search() {
      this.$store.dispatch("search", this.searchText);
    },
    setCity() {
      this.$store.commit("setCity", this.searchText);
      this.fetchWeather();
    },
    fetchWeather() {
      this.$store.dispatch("fetchForecast");
    },
  },
};
</script>
