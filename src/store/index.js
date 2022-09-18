import { createStore } from "vuex";
import axios from "axios";
import settings from "./modules/settings";

export default createStore({
  state: {
    city: "",
    searchCity: "",
    country: "",
    date: "",
    localtime: "",
    hourIndex: 0,
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    activeHour: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    dayIndex: 0,
    forecast: [],
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
    setCurrentWeather(state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    setLocaltime(state, localtime) {
      state.localtime = localtime;
    },
    setHourIndex(state, hourIndex) {
      state.hourIndex = hourIndex;
    },
    setActiveHour(state, hourIndex) {
      state.activeHour[hourIndex] = 1;
    },
    deactivateAllHours(state) {
      state.activeHour = state.activeHour.map(() => 0);
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
          `https://api.weatherapi.com/v1/forecast.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&days=6&aqi=yes&alerts=no`
        ),
        axios.get(
          `https://api.weatherapi.com/v1/current.json?key=c48712edce2441edae5122038222706&q=${this.state.city}&aqi=yes`
        ),
        axios.get(
          `https://api.weatherapi.com/v1/timezone.json?key=c48712edce2441edae5122038222706&q=${this.state.city}`
        ),
      ])
        .then(([forecast, currentWeather, timmeZone]) => {
          commit("setForecast", forecast.data.forecast.forecastday);
          commit("setCurrentWeather", currentWeather.data);
          commit("setLocaltime", timmeZone.data.location.localtime);
          commit(
            "setHourIndex",
            parseInt(
              timmeZone.data.location.localtime.split(" ")[1].slice(0, -3)
            )
          );
          commit("deactivateAllHours");
          commit(
            "setActiveHour",
            parseInt(
              timmeZone.data.location.localtime.split(" ")[1].slice(0, -3)
            )
          );
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
    fetchSearchList({ commit }) {
      axios
        .get(
          `https://api.weatherapi.com/v1/search.json?key=c48712edce2441edae5122038222706&q=${this.state.searchCity}`
        )
        .then((response) => {
          commit("setSearchCities", response.data);
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
