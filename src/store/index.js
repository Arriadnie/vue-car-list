import Vue from "vue";
import Vuex from "vuex";

import { mockVehicles } from "@/mockData/mockVehicles";
import axios from "axios";

Vue.use(Vuex);

export const MUTATION_TYPES = {
  SET_UNITS_OF_MEASURE: "SET_UNITS_OF_MEASURE",
  SET_VEHICLES: "SET_VEHICLES",
};

export default new Vuex.Store({
  state: {
    isMock: true, // Set to false to get data from api
    vehicles: [],
    unitsOfMeasure: "km",
  },

  getters: {
    getVehicles: (store) => {
      return store.vehicles;
    },

    bySearchName: (store) => (searchString) => {
      const byLetters = (string) => {
        if (string) {
          const newString = string.toString().toLowerCase();
          return newString.includes(searchString.toLowerCase());
        }
        return false;
      };

      const filteredByMake = store.vehicles.filter(({ make }) =>
        byLetters(make)
      );
      const filteredByModel = store.vehicles.filter(({ model }) =>
        byLetters(model)
      );
      const filteredByVersion = store.vehicles.filter(({ version }) =>
        byLetters(version)
      );

      const all = [...filteredByMake, ...filteredByModel, ...filteredByVersion];

      const allIDs = all.map(({ id }) => id);

      const uniqueIDs = Array.from(new Set(allIDs));

      return uniqueIDs.map((carId) => all.find(({ id }) => id === carId));
    },
  },

  mutations: {
    [MUTATION_TYPES.SET_UNITS_OF_MEASURE](state, payload) {
      state.unitsOfMeasure = payload.value;
    },

    [MUTATION_TYPES.SET_VEHICLES](state, payload) {
      state.vehicles = payload;
    },
  },

  actions: {
    async setVehicles(store) {
      if (!store.state.isMock) {
        // https://github.com/garmeeh/local-cors-proxy - used this package for local-cors proxy
        // run ` lcp --proxyUrl https://jsonkeeper.com/b/S3US ` to get access to local copy of proxy
        await axios
            .get('http://localhost:8010/proxy')
            .then(({ data }) => store.commit(MUTATION_TYPES.SET_VEHICLES, data))
            .catch(console.error); // Handle error from request
      } else {
        store.commit(MUTATION_TYPES.SET_VEHICLES, mockVehicles);
      }
    },
  },
});
