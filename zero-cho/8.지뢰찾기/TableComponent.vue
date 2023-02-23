<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="'mine-row' + rowIndex">
      <td v-for="(cellData, cellIndex) in rowData"
          :key="'mine-cell' + cellIndex"
          :style="cellDataStyle(rowIndex, cellIndex)"
          @click="onClickTd(rowIndex, cellIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        <!--
          오른쪽 마우스 클릭 => @contextmenu
          prevent를 붙여야 기본 설정 동작이 실행 안됨
        -->
        {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import {mapState} from "vuex";
import store, {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL} from "./store";

export default {
  store,
  computed: {
    ...mapState(["tableData", "halted"]),
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
          return "💥";
        case CODE.MINE:
          return "💣";
        case CODE.NORMAL:
          return ""
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return "❓";
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          return "🏳️";
        default:  // OPENED
          return state.tableData[rowIndex][cellIndex] || "";  // 주변에 지뢰가 없으면 빈칸
      }
    },
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      if (this.halted) {
        return;
      }

      switch (this.tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.FLAG:
        case CODE.QUESTION:
          this.$store.commit(OPEN_CELL, {row: rowIndex, cell: cellIndex});
          return;
        case CODE.MINE:
        case CODE.FLAG_MINE:
        case CODE.QUESTION_MINE:
          this.$store.commit(CLICK_MINE, {row: rowIndex, cell: cellIndex});
          return;
      }
    },
    onRightClickTd(rowIndex, cellIndex) {
      if (this.halted) {
        return;
      }

      switch (this.tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL, {row: rowIndex, cell: cellIndex});
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL, {row: rowIndex, cell: cellIndex});
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          this.$store.commit(NORMALIZE_CELL, {row: rowIndex, cell: cellIndex});
          return;
      }
    },
  }
};
</script>

<style scoped>

</style>