import { createStore } from "vuex";
import axios from "axios";
import settings from "./modules/settings";

export default createStore({
  state: {
    city: "",
    searchCity: "",
    country: "",
    date: "",
    hourIndex: 0,
    dayIndex: 0,
    forecast: [],
    astronomy: [],
    currentWeather: null,
    searchCities: null,
    favoriteCities: [],
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
    setHourIndex(state, hourIndex) {
      state.hourIndex = hourIndex;
    },
    setDayIndex(state, dayIndex) {
      state.dayIndex = dayIndex;
    },
    setSearchCities(state, searchCities) {
      state.searchCities = searchCities;
    },
    clearCities(state) {
      state.searchCities = null;
    },
    setSearchCity(state, searchCity) {
      state.searchCity = searchCity;
    },
    setCity(state, city) {
      state.city = city;
    },
    addCity(state) {
      if (typeof state.currentWeather.location.name !== "undefined") {
        if (state.favoriteCities.length === 0) {
          state.favoriteCities.push(state.currentWeather.location.name);
          console.log(state.favoriteCities);
        } else if (
          !state.favoriteCities.includes(state.currentWeather.location.name)
        ) {
          state.favoriteCities.push(state.currentWeather.location.name);
          console.log(state.favoriteCities);
        }
      }
    },
    removeCity(state, index) {
      if (index > -1) {
        state.favoriteCities.splice(index, 1);
      }
    },
    setCurrentCity(state, index) {
      state.city = state.favoriteCities[index];
    },
    initialiseStore(state) {
      if (localStorage.getItem("favoriteCities")) {
        Object.assign(
          state,
          JSON.parse(localStorage.getItem("favoriteCities"))
        );
      }
    },
  },
  actions: {
    fetchWeather({ commit }) {
      Promise.all([
        axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&days=6&aqi=yes&alerts=no`
        ),
        axios.get(
          `https://api.weatherapi.com/v1/current.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&aqi=yes`
        ),
      ])
        .then(([forecast, currentWeather]) => {
          commit("setForecast", forecast.data.forecast.forecastday);
          commit("setCurrentWeather", currentWeather.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchSearchList({ commit }) {
      axios
        .get(
          `https://api.weatherapi.com/v1/search.json?key=c48712edce2441edae5122038222706&q=${this.state.searchCity}`
        )
        .then((response) => {
          commit("setSearchCities", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setHourIndex({ commit }, hourIndex) {
      commit("setHourIndex", hourIndex);
    },
    setDayIndex({ commit }, dayIndex) {
      commit("setDayIndex", dayIndex);
    },
  },
  modules: {
    settings,
  },
});
