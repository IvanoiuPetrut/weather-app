<template>
  <p>{{ hours[hourIndex] }}:00</p>
</template>

<script>
export default {
  name: "NextHours",
  props: {
    hours: {
      type: Array,
      required: true,
    },
    hourIndex: {
      type: Number,
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
