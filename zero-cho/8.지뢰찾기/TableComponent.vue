<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="'mine-row' + rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="'mine-cell' + cellIndex">{{ cellData }}</td>
    </tr>
  </table>
</template>

<script>
import {mapState} from "vuex";
import store from "./store";

export default {
  store,
  computed: {
    ...mapState(["tableData"]),
  }
};
</script>

<style scoped>

</style>