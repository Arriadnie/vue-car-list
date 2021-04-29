<template>
  <div class="vehicle-card" :class="{ sold : isVehicleSold }">
    <div class="vehicle-card__image">
      <img :src="vehicle.image" alt="Car" class="vehicle-card__image" />
      <div v-if="vehicle.isKm0" class="vehicle-card__image-label">
        <p>km0</p>
      </div>
    </div>
    <div class="vehicle-card__info">
      <h6 class="vehicle-card__car-make">{{ vehicle.make }}</h6>
      <div class="vehicle-card__car-version">
        {{ vehicle.version }}
      </div>
      <div class="vehicle-card__delimiter"></div>
      <div class="price-wrapper">
        <div>
          <div class="starting-from">A partire da</div>
          <span class="price">
            {{ vehicle.price | currencyEUR }}
          </span>
        </div>
        <div class="icon like" @click="$emit('like', vehicle.id)">
          <like-icon v-bind="{ heartType }" />
        </div>
      </div>
      <div class="vehicle-card__statistics">
        <p class="vehicle-card__statistics-title">
          {{ registrationYear }} -
          {{ vehicleKm | convertUnits(unitsOfMeasure) }}
          {{ unitsOfMeasure }}
        </p>
        <div class="vehicle-card__statistics-detail">
          <p v-if="unitsOfMeasure === 'km'">
            Cons. Comb. Carburate:
            {{ vehicle.homologationStandard.wltp.consumption.combined }} l/100km
            - CO2: {{ vehicle.co2 }} g/km
          </p>
          <p v-else>
            Cons. Comb. Carburate:
            {{
              vehicle.homologationStandard.wltp.consumption.combined
                | convertConsumption
            }}
            l/100miles - CO2: {{ vehicle.co2 }} g/km
          </p>
          <div class="label">
            <div class="icon">
              <svg
                viewBox="0 0 40 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0267 0H40V16H10.0267L0 8.07917L10.0267 0Z"
                  fill="#008F36"
                />
              </svg>
            </div>
            <span>A+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LikeIcon from "@/components/icons/LikeIcon";
import { mapState } from "vuex";

export default {
  name: "VehicleCard",

  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },

  components: {
    LikeIcon,
  },

  filters: {
    currencyEUR: (price) => `€ ${price}`,
    convertUnits: (units, unitsOfMeasure) =>
      unitsOfMeasure === "km" ? units : (units / 1.621371).toFixed(1),
    convertConsumption: (units) => ((Number(units) * 100) / 62).toFixed(1),
  },

  computed: {
    ...mapState(["unitsOfMeasure"]),

    isVehicleSold () {
      return this.vehicle.status === 'SOLD'
    },

    heartType() {
      return this.vehicle.liked ? "orange" : "grey";
    },

    registrationYear() {
      return this.vehicle.registrationYear
        ? this.vehicle.registrationYear
        : "Unknown";
    },

    vehicleKm() {
      return this.vehicle.km === -1 ? 0 : this.vehicle.km;
    },
  },
};
</script>

<style scoped lang="sass">
@import "src/assets/sass/components/vehicle-card"
</style>
