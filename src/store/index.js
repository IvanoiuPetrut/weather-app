import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    city: "Sibiu",
    searchCity: "",
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
    searchCities: null,
    cities: [],
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
        // check if city already exists in cities
        // if (!state.cties.includes(state.currentWeather.location.name)) {
        if (state.cities.length === 0) {
          state.cities.push(state.currentWeather.location.name);
          console.log(state.cities);
        } else if (!state.cities.includes(state.currentWeather.location.name)) {
          state.cities.push(state.currentWeather.location.name);
          console.log(state.cities);
        }
      }
    },
    removeCity(state, index) {
      if (index > -1) {
        state.cities.splice(index, 1);
      }
    },
    setCurrentCity(state, index) {
      state.city = state.cities[index];
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
      if (localStorage.getItem("location")) {
        Object.assign(state, JSON.parse(localStorage.getItem("location")));
      }
    },
  },
  actions: {
    fetchWeather({ commit }) {
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
  },
  modules: {},
});
