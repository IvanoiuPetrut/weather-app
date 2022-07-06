import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    baseUrl: "http://api.weatherapi.com/v1/",
    weatherType: "forecast",
    city: "Sibiu",
    country: "Romania",
    date: "2020-01-01",
    isCelsius: true,
    isKmH: true,
    isMm: true,
    isMb: true,
    isKm: true,
    forecast: [],
    astronomy: [],
    currentWeather: null,
  },
  getters: {},
  mutations: {
    setCurrentDate(state) {
      state.date = new Date().toISOString().slice(0, 10);
    },
    setForecast(state, forecast) {
      state.forecast = forecast;
    },
    setAstronomy(state, astronomy) {
      state.astronomy = astronomy;
    },
    setCurrentWeather(state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    setCity(state, city) {
      state.city = city;
    },
    toggleTemperatureType(state) {
      state.isCelsius = !state.isCelsius;
    },
    toggleSpeedType(state) {
      state.isKmH = !state.isKmH;
    },
    toggleSuprafaceType(state) {
      state.isMm = !state.isMm;
    },
    togglePressureType(state) {
      state.isMb = !state.isMb;
    },
    toggleDistanceType(state) {
      state.isKm = !state.isKm;
    },
    initialiseStore(state) {
      if (localStorage.getItem("settings")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("settings")))
        );
      }
    },
  },
  actions: {
    fetchForecast({ commit }) {
      axios
        .all([
          axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&days=6&aqi=no&alerts=no`
          ),
          axios.get(
            `https://api.weatherapi.com/v1/astronomy.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&dt=${this.state.date}`
          ),
          axios.get(
            `https://api.weatherapi.com/v1/current.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&aqi=yes`
          ),
        ])
        .then(
          axios.spread((forecast, astronomy, currentWeather) => {
            commit("setForecast", forecast.data.forecast.forecastday);
            commit("setAstronomy", astronomy.data.astronomy.astro);
            commit("setCurrentWeather", currentWeather.data);
            console.log(currentWeather.data);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
