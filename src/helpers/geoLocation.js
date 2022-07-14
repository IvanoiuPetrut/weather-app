export const geoLocation = {
  methods: {
    success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = latitude + "," + longitude;
      console.log(location);
      this.$store.commit("setCity", location);
      this.$store.dispatch("fetchWeather");
    },
    error(error) {
      console.log(error);
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
