<template>
  <ul class="hours">
    <li v-for="(hour, index) in hours" :key="index">{{ hour }}:00</li>
  </ul>
</template>

<script>
export default {
  name: "NextHours",
  data() {
    return {
      hours: [],
    };
  },
  methods: {
    getCurrentHour() {
      let date = new Date();
      let hour = date.getHours();
      return hour;
    },
    getNextHours(amount) {
      let currentHour = this.getCurrentHour();
      for (var i = 0; i < amount; i++) {
        let hour = currentHour + i;
        if (hour > 23) {
          hour = hour - 24;
        }
        this.hours.push(hour);
      }
    },
  },
  created() {
    this.getNextHours(8);
  },
};
</script>

<style lang="scss" scoped>
.hours {
  color: #fff;
  display: flex;
  gap: 1.2rem;
}
</style>
