const state = {
  isCelsius: true,
  isKmH: true,
  isMm: true,
  isMb: true,
  isKm: true,
};

const mutations = {
  toggleTemperatureType(state) {
    state.isCelsius = !state.isCelsius;
    console.log(state.isCelsius);
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
  initialiseSettings(state) {
    if (localStorage.getItem("settings")) {
      Object.assign(state, JSON.parse(localStorage.getItem("settings")));
    }
  },
};

const actions = {
  toggleTemperatureType({ commit }) {
    commit("toggleTemperatureType");
  },
  toggleSpeedType({ commit }) {
    commit("toggleSpeedType");
  },
  toggleSuprafaceType({ commit }) {
    commit("toggleSuprafaceType");
  },
  togglePressureType({ commit }) {
    commit("togglePressureType");
  },
  toggleDistanceType({ commit }) {
    commit("toggleDistanceType");
  },
  initialiseSettings({ commit }) {
    commit("initialiseSettings");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
