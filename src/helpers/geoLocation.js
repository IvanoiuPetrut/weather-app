export const geoLocation = {
  methods: {
    succes(position) {
      this.$store.commit(
        "setCity",
        `${position.coords.latitude},${position.coords.longitude}`
      );
      console.log(this.$store.state.city);
      this.$store.dispatch("fetchWeather");
    },
    error(error) {
      console.log(error);
    },
  },
  beforeCreate() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$store.commit(
            "setCity",
            `${position.coords.latitude},${position.coords.longitude}`
          );
          console.log(this.$store.state.city);
          this.$store.dispatch("fetchWeather");
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  },
};
