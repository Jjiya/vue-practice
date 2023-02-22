<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
  name: "TdComponent",
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  },
  methods: {
    onClickTd() {
      if (this.cellData) { // 이미 눌러진 칸일 때
        return;
      }
      // console.log(this.$root.$data);  // 최상위 root data 접근
      // console.log(this.$parent.$data);  // 상위 parent data 접근
      const {turn, tableData} = this.$root.$data;

      tableData[this.rowIndex][this.cellIndex] = turn;
      /*
        원래는 배열 data의 index에 접근해서 값을 바꾸면 vue가 자동 렌더링 되지 않았는데
        vue3로 업데이트되면서 개선된 것 같음

        원래 tableData[1][0] = "X" 같은 경우 작동하지 않아서
        vue의 set함수를 통해 변경해줘야 data 변경을 감지할 수 있었음
        => data변경 감지 시 주소 값을 통해 감지하는데,
           index를 통한 접근은 주소에 들어있는 배열 값이 실질적으로 변경되지 않았기 때문이다.
           (vue가 가리키고 있는 주소 내의 주소 값에 들어가야 값이 변경된 것을 알 수 있기 때문)

        e.g) 1. this.$set(this.tableData[1], 0, "X");
        2-1. import Vue from "vue";
        2-2. Vue.set(this.tableData[1], 0, "X");
      */

      if (this.checkWin()) {  // 이긴 경우 (3줄 달성)
        this.$root.initData(turn);
        return;
      }

      let allCheck = true;

      tableData.forEach(row => {
        if (row.includes("")) {
          allCheck = false;
        }
      });

      if (allCheck) { // 무승부
        this.$root.initData(null);
      } else {
        this.$root.changeTurn();
      }
    },
    checkWin() {  // 이겼는지 확인
      const {turn, tableData} = this.$root.$data;
      const score = {
        horizon: 0,
        vertical: 0,
        leftDiagonal: 0,
        rightDiagonal: 0,
      };

      for (let i = 0; i < tableData.length; i++) {
        if (tableData[this.rowIndex][i] === turn) {
          score.horizon += 1;
        }
        if (tableData[i][this.cellIndex] === turn) {
          score.vertical += 1;
        }
        if (tableData[i][i] === turn) {
          score.leftDiagonal += 1;
        }
        if (tableData[i][tableData.length - i - 1] === turn) {
          score.rightDiagonal += 1;
        }
      }

      for (let direction in score) {
        if (score[direction] === tableData.length) {
          return true;
        }
      }

      return false;
    }
  }
}
</script>

<style scoped>

</style>