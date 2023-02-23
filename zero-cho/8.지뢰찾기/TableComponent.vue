<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="'mine-row' + rowIndex">
      <td v-for="(cellData, cellIndex) in rowData"
          :key="'mine-cell' + cellIndex"
          :style="cellDataStyle(rowIndex, cellIndex)"
      >
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import {mapState} from "vuex";
import store, {CODE} from "./store";

export default {
  store,
  computed: {
    ...mapState(["tableData"]),
    cellDataStyle: (state) => (rowIndex, cellIndex) => {
      let style = {
        background: "#fff"
      }
      switch (state.tableData[rowIndex][cellIndex]) {
        case CODE.OPENED:
        case CODE.CLICKED_MINE:
          style.background = "#fff";
          break;
        case CODE.NORMAL:
        case CODE.MINE:
          style.background = "#666";
          break;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          style.background = "yellow";
          break;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          style.background = "red";
          break;
      }

      return style;
    },
    cellDataText: state => (rowIndex, cellIndex) => {
      switch (state.tableData[rowIndex][cellIndex]) {
        case CODE.CLICKED_MINE:
          return "펑";
        case CODE.MINE:
          return "💣";
        case CODE.OPENED:
        case CODE.NORMAL:
          return ""
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return "?";
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          return "!";
        default:
          return "";
      }
    },
  }
};
</script>

<style scoped>

</style>