<template>
  <div>
    <div v-if="active === 1">{{ active }}</div>
    <div v-if="active === 2">{{ active }}</div>
    <div v-if="active === 3">{{ active }}</div>
    <div v-if="active === 4">{{ active }}</div>
    <div v-if="active === 5">{{ active }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  layout: "my-layout",

  data() {
    return {
      nuxt: "nuxt"
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["active"])
  }
};
</script>

<style lang="less" scoped></style>
