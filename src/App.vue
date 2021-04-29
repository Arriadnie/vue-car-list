<template>
  <div id="app" class="app">
    <h1 class="app__title">Search Page</h1>

    <div class="app__container">
      <search-box @search="searchByName" />

      <div class="vehicle-list">
        <vehicle-card
          v-for="vehicle in values"
          :key="vehicle.id"
          :vehicle="vehicle"
          @like="like"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VehicleCard from "./components/VehicleCard.vue";
import SearchBox from "./components/SearchBox.vue";
import { mapState, mapGetters, mapActions } from "vuex";

import debounce from "lodash.debounce";

export default {
  name: "App",

  components: {
    "vehicle-card": VehicleCard,
    "search-box": SearchBox,
  },

  data() {
    return {
      values: [],
    };
  },

  computed: {
    ...mapState(["vehicles"]),

    ...mapGetters(["bySearchName"]),
  },

  async mounted() {
    await this.setVehicles();
    this.checkLikedCars();
  },

  methods: {
    ...mapActions(["setVehicles"]),

    checkLikedCars() {
      const initial = window.sessionStorage.getItem("likedVehicles") ?? [];

      const initialIDs = initial.length ? JSON.parse(initial) : initial;

      if (initialIDs.length) {
        this.values = this.vehicles.map((vehicle) => {
          return {
            ...vehicle,
            liked: initialIDs.includes(vehicle.id),
          };
        });
      } else {
        this.values = this.vehicles;
      }
    },

    searchByName: debounce(function(name) {
      const result = name ? this.bySearchName(name) : this.values;

      if (name) {
        this.values = this.values.filter(
          ({ id }) => id === result.find(({ id: cid }) => cid === id)?.id
        );
      } else {
        this.checkLikedCars();
      }
    }, 500),

    like(id) {
      const initial = window.sessionStorage.getItem("likedVehicles") ?? [];

      const initialIDs = initial.length ? JSON.parse(initial) : initial;

      const carIDxToBeLiked = this.values.findIndex(
        ({ id: carID }) => carID === id
      );

      const isCarLiked = initialIDs.includes(id);
      // We use this.$set because when we mutate reactive data by index, reactivity disapears
      this.$set(this.values[carIDxToBeLiked], "liked", !isCarLiked);

      if (!isCarLiked) {
        initialIDs.push(id);
      } else {
        initialIDs.splice(initialIDs.indexOf(id), 1);
      }

      window.sessionStorage.setItem(
        "likedVehicles",
        JSON.stringify(initialIDs)
      );
    },
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/app"
@import "src/assets/sass/components/search-page"
@import "src/assets/sass/components/vehicle-list"
</style>
