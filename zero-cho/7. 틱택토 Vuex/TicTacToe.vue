<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component>
      <!--
        slot -> data를 parent에서 관리할 수 있는 장점 (component는 분리되지만)
        ioc 느낌?
        뭔말인지 모르겠으면 강의 다시 보기 => https://www.inflearn.com/course/lecture?courseSlug=web-game-vue&unitId=23201&tab=curriculum

        slot이 있으면 (추후 라이브러리 사용 시) 커스터마이징하기가 편함
        -->
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <!--
            v-for의 key 사용 시 index를 사용하지 않는게 좋은 경우
            배열의 값이 삭제될 경우
            => 삭제된 요소의 뒤에있는 값이 앞으로 땡겨지면서 화면에 다시 그려지게 됨
            index + Math.random()이나 고유한 구별자가 있으면 붙여줘도 좋음
        -->
        <td v-for="(cellData, cellIndex) in rowData"
            :key="cellIndex"
            @click="onClickTd(rowIndex, cellIndex)"
        >
          {{ cellData }}
        </td>
      </tr>
    </table-component>
    <hr/>
    <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData"
            :key="cellIndex"
            @click="onClickTd(rowIndex, cellIndex)"
        >
          {{ cellData }}
        </td>
      </tr>
    </table>
    <dialog open v-if="winner">
      {{ turnMessage }}
      <form method="dialog">
        <button value="cancel" @click="closePopup">닫기</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import TableComponent from "./TableComponent";
import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from "./store";

export default {
  store,
  components: {TableComponent},
  data() {
    return {
      data: 1,
    };
  },
  computed: {
    ...mapState(["turn", "winner", "tableData"]),
    // ...mapState({  // 객체 형으로도 가능
    //   winner : state => state.winner,
    //   turnState : "turn",  // <= state에 있는 키 값 변경 시 이런 방법도 가능
    //   turn (state) {
    //      return state.turn + this.data;  // 기존 component에 있는 값을 불러와서 쓸 수도 있음 ( arrow function(=>)에서는 적용 불가능)
    //    }
    // }),
    //아래의 코드를 mapState를 이용해 간편하게 불러올 수 있도록 변경할 수 있음
    // turn() {
    //   return this.$store.state.turn;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // }
    ...mapGetters(["turnMessage"]),
  },
  methods: {
    closePopup() {
      this.$store.commit(NO_WINNER);
    },
    onClickTd(rowIndex, cellIndex) {  // vuex를 이용하면 state 변경 시 computed가 재렌더링 돼서 컴포넌트를 잘게 쪼개어봤자 렌더링이 component 개수대로 일어나기 때문에 쪼개지않고 여기다가 합침
      if (this.tableData[rowIndex][cellIndex]) { // 이미 눌러진 칸일 때
        return;
      }
      this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex}); // commit -> mutation 호출

      this.tableData[rowIndex][cellIndex] = this.turn;

      if (this.checkWin(rowIndex, cellIndex)) {  // 이긴 경우 (3줄 달성)
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
    checkWin(rowIndex, cellIndex) {  // 이겼는지 확인
      const score = {
        horizon: 0,
        vertical: 0,
        leftDiagonal: 0,
        rightDiagonal: 0,
      };

      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[rowIndex][i] === this.turn) {
          score.horizon += 1;
        }
        if (this.tableData[i][cellIndex] === this.turn) {
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