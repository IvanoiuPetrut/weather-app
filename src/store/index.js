import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL =
  "http://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=sibiu&days=6&aqi=no&alerts=no";

export default createStore({
  state: {
    city: "Sibiu",
    country: "Romania",
    isCelsius: true,
    isKmH: true,
    isMm: true,
    isMb: true,
    forecast: [],
  },
  getters: {},
  mutations: {
    setForecast(state, forecast) {
      state.forecast = forecast;
    },
    toggleTemperatureType(state) {
      state.isCelsius = !state.isCelsius;
      console.log(state.isCelsius);
    },
    initialiseStore(state) {
      if (localStorage.getItem("settings")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
  },
  actions: {
    fetchForecast({ commit }) {
      axios
        .get("forecast")
        .then((response) => {
          commit("setForecast", response.data.forecast.forecastday);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
