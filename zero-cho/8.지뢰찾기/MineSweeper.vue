<template>
  <div>
    <mine-form/>
    <div>{{ timer }}</div>
    <table-component></table-component>
    <div>{{ resultMessage }}</div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import TableComponent from "./TableComponent";
import MineForm from "./MineForm";
import store, {} from "./store";

export default {
  store,
  components: {TableComponent, MineForm},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      timer: state => state.timer,
    }),
    ...mapGetters(["resultMessage"]),
  },
  methods: {}
}
</script>

<style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>