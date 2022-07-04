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
    forecast: [],
    astronomy: [],
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
    toggleTemperatureType(state) {
      state.isCelsius = !state.isCelsius;
    },
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
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
        ])
        .then(
          axios.spread((forecast, astronomy) => {
            commit("setForecast", forecast.data.forecast.forecastday);
            commit("setAstronomy", astronomy.data.astronomy.astro);
          })
        );
    },
  },
  modules: {},
});
