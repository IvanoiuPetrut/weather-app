export const geoLocation = {
  methods: {
    success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = latitude + "," + longitude;
      this.$store.commit("setCity", location);
      this.$store.dispatch("fetchWeather");
    },
    error(error) {
      console.log(error);
      this.$store.commit("setCity", "sibiu");
      this.$store.dispatch("fetchWeather");
    },
  },
  beforeCreate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.success(position),
        (error) => this.error(error)
      );
    }
  },
};
