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
