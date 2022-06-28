<template>
  <div class="card">
    <h3 class="day"></h3>
    <img src="http://placekitten.com/100/100" alt="cat" />
    <div class="temperature">
      <p class="temperature__high">H:</p>
      <p class="temperature__low">L:</p>
    </div>
    <p class="weather">mostly sunny</p>
  </div>
</template>

<script>
export default {
  name: "DayTemperature",
  data() {
    return {
      nextDays: [],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
};
</script>
