<template>
  <input type="text" v-model="searchText" placeholder="Enter city" />
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
  },
};
</script>
