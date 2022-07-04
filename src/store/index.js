import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    baseUrl: "http://api.weatherapi.com/v1/",
    weatherType: "forecast",
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
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
  },
  actions: {
    fetchForecast({ commit }) {
      axios(
        "http://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=sibiu&days=6&aqi=no&alerts=no"
      )
        .then((response) => {
          console.log(response.data);
          commit("setForecast", response.data.forecast.forecastday);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
  },
  modules: {},
});
