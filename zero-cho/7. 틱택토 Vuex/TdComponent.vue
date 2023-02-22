<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import {mapState} from "vuex";
import {CLICK_CELL, RESET_GAME, CHANGE_TURN, NO_WINNER, SET_WINNER} from "./store";

export default {
  name: "TdComponent",
  props: {
    cellIndex: Number,
    rowIndex: Number
  },
  data() {
    return {}
  },
  computed: {  // vuex state 사용을 위해서는 computed에 연결해줘야함,
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      cellData(state){
        return state.tableData[this.rowIndex][this.cellIndex];
      }
    }),
    // cellData(){
    //   return this.tableData[this.rowIndex][this.cellIndex];
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn(){
    //   return this.$store.state.turn;
    // }
  },
  methods: {
    onClickTd() {
      if (this.cellData) { // 이미 눌러진 칸일 때
        return;
      }
      this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex}); // commit -> mutation 호출

      this.tableData[this.rowIndex][this.cellIndex] = this.turn;

      if (this.checkWin()) {  // 이긴 경우 (3줄 달성)
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GAME);
        return;
      }

      let allCheck = true;

      this.tableData.forEach(row => {
        if (row.includes("")) {
          allCheck = false;
        }
      });

      if (allCheck) { // 무승부
        this.$store.commit(NO_WINNER);
        this.$store.commit(RESET_GAME);
      } else {
        this.$store.commit(CHANGE_TURN);
      }
    },
    checkWin() {  // 이겼는지 확인
      const score = {
        horizon: 0,
        vertical: 0,
        leftDiagonal: 0,
        rightDiagonal: 0,
      };

      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[this.rowIndex][i] === this.turn) {
          score.horizon += 1;
        }
        if (this.tableData[i][this.cellIndex] === this.turn) {
          score.vertical += 1;
        }
        if (this.tableData[i][i] === this.turn) {
          score.leftDiagonal += 1;
        }
        if (this.tableData[i][this.tableData.length - i - 1] === this.turn) {
          score.rightDiagonal += 1;
        }
      }

      for (let direction in score) {
        if (score[direction] === this.tableData.length) {
          return true;
        }
      }

      return false;
    },
  }
}
</script>

<style scoped>

</style>