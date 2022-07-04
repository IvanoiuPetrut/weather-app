import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    baseUrl: "http://api.weatherapi.com/v1/",
    weatherType: "forecast",
    city: "Sibiu",
    country: "Romania",
    temperatureType: "C",
    isCelsius: true,
    windSpeedType: "km/h",
    precipitationType: "mm",
    pressureType: "mb",
    visibilityType: "km",
    forecast: [],
  },
  getters: {},
  mutations: {
    setForecast(state, forecast) {
      state.forecast = forecast;
    },
    toggleTemperatureType(state) {
      state.temperatureType = state.temperatureType === "C" ? "F" : "C";
      state.isCelsius = !state.isCelsius;
      localStorage.setItem("temperatureType", state.temperatureType);
      localStorage.setItem("isCelsius", state.isCelsius);
      console.log(state.isCelsius);
    },
    initialiseStore(state) {
      if (localStorage.getItem("temperatureType")) {
        state.temperatureType = localStorage.getItem("temperatureType");
      }
      if (localStorage.getItem("isCelsius")) {
        state.isCelsius = JSON.parse(localStorage.getItem("isCelsius"));
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
