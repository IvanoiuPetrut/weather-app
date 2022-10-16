<template>
  <div class="select-location">
    <div class="header">
      <h2 class="header__title">Get the weather</h2>
      <IconWeather name="logo" class="header__logo"></IconWeather>
    </div>
    <div class="get-your-location">
      <p v-if="this.$store.state.error.length > 0" class="error">
        {{ this.$store.state.error }}
      </p>
      <div class="select-location__search">
        <SearchBar></SearchBar>
      </div>
      <button class="get-your-location__btn" @click="getLocation">
        <IconWeather name="current-location" class="icon"></IconWeather>
        <span class="btn__text"> Use my location </span>
      </button>
    </div>
  </div>
</template>

<script>
import IconWeather from "./IconWeather.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "SelectLocation",
  components: {
    IconWeather,
    SearchBar,
  },
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
    },
    getLocation() {
      console.log("get location");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => this.success(position),
          (error) => this.error(error)
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.select-location {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem 3.2rem;
  // max-width: 800px;
  // make the width of the container a maximum of 700px and a minimum of 300px
  width: clamp(200px, 90%, 600px);
  background-color: colors.$primary-color;
  border-radius: 13px;
  border: 1px solid colors.$transparent-color-neutral;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    padding: 1.6rem 2rem;
  }

  @media (max-width: 360px) {
    padding: 1rem 0.6rem;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-bottom: 2.4rem;

    @media (max-width: 480px) {
      flex-direction: column-reverse;
      gap: 0.4rem;
    }

    &__title {
      font-size: 2rem;
      @media (max-width: 768px) {
        font-size: 1.6rem;
      }

      @media (max-width: 480px) {
        font-size: 1.4rem;
      }
    }

    &__logo {
      width: 3.2rem;
      height: 3.2rem;
      @media (max-width: 768px) {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }

  .select-location__search {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
  .error {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
    border-radius: 7px;
    color: colors.$red;
    background-color: colors.$red-transparent;
    border: 1px solid colors.$red;
    white-space: nowrap;

    position: absolute;
    top: -40%;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      font-size: 0.8rem;
      top: -120%;
    }
  }
  .get-your-location {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    position: relative;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 1.6rem;
    }

    @media (max-width: 480px) {
      gap: 0.6rem;
    }
  }

  .get-your-location__btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 13px;
    color: colors.$text-color;
    background-color: colors.$secondary-color;
    border: 1px solid colors.$transparent-color-neutral;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
      padding: 0.4rem 0.8rem;
      .btn__text {
        display: none;
      }
    }

    &:hover {
      background-color: colors.$transparent-primary-color;
      border-color: colors.$accent-color;
    }

    .icon {
      width: 1.6rem;
      height: 1.6rem;

      @media (max-width: 768px) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
}
</style>
