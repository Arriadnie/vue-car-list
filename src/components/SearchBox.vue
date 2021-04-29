<template>
  <div class="search-box">
    <div class="search-box__title-wrapper">
      <div class="icon">
        <filter-icon/>
      </div>
      <h3 class="search-box__title">Filters</h3>
    </div>
    <div class="search-box__block">
      <div class="search-box__block-title">Search</div>
      <search-input
        placeholder="Search"
        @input="$emit('search', $event.target.value)"
      />
    </div>
    <div class="search-box__block">
      <div class="search-box__block-title">Units of measure</div>
      <div class="buttons">
        <button
          :class="['main-btn', { 'btn-active': unitsOfMeasure === 'miles' }]"
          @click="changeUntis('miles')"
        >
          Miles
        </button>
        <button
          :class="['main-btn', { 'btn-active': unitsOfMeasure === 'km' }]"
          @click="changeUntis('km')"
        >
          Km
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "./SearchInput.vue"
import FilterIcon from './icons/FilterIcon'
import { mapState, mapMutations } from "vuex"
import { MUTATION_TYPES } from "../store/index"

export default {
  name: "SearchBox",

  components: {
    SearchInput,
    FilterIcon,
  },

  computed: {
    ...mapState(['unitsOfMeasure']),
  },

  methods: {
    ...mapMutations([MUTATION_TYPES.SET_UNITS_OF_MEASURE]),

    changeUntis(name) {
      if (this.unitsOfMeasure !== name) {
        this[MUTATION_TYPES.SET_UNITS_OF_MEASURE]({ value: name })
      }
    },
  },
}
</script>


<style lang="sass">
@import "../assets/sass/components/search-form"
</style>
