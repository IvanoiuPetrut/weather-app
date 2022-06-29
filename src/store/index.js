import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    baseUrl: "http://api.weatherapi.com/v1/",
    weatherType: "forecast",
    city: "Sibiu",
    country: "Romania",
    temperatureType: "C",
    windSpeedType: "km/h",
    precipitationType: "mm",
    pressureType: "mb",
    visibilityType: "km",
    nextDays: [],
  },
  getters: {},
  mutations: {
    setNextDays(state, nextDays) {
      state.nextDays = nextDays;
    },
  },
  actions: {
    fetchForecast({ commit }) {
      axios(
        "http://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=sibiu&days=6&aqi=no&alerts=no"
      )
        .then((response) => {
          console.log(response.data);
          commit("setNextDays", response.data.forecast.forecastday);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
  },
  modules: {},
});
