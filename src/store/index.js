import { createStore } from "vuex";

export default createStore({
  state: {
    baseUrl: "http://api.weatherapi.com/v1/",
    weatherType: "forecast",
    city: "Sibiu",
    country: "Romania",
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
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=Sibiu&days=10&aqi=no&alerts=no"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.forecast.forecastday);
          commit("setNextDays", data.forecast.forecastday);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
