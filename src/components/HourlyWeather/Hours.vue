<template>
  <ul class="hours">
    <li v-for="(hour, index) in hours" :key="index">{{ hour }}:00</li>
  </ul>
</template>

<script>
export default {
  name: "NextHours",
  props: {
    hours: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.hours {
  color: #fff;
  display: grid;
  grid-template-columns: repeat(8, 3.2rem);
  li {
    justify-self: center;
  }
}
</style>
