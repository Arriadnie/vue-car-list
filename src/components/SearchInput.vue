<template>
     <input
          type="text"
          class="search-input"
          v-bind="$attrs"
          v-on="$listeners"
     >
</template>

<style lang="sass" scoped>
@import "src/assets/sass/components/search-input"
</style>