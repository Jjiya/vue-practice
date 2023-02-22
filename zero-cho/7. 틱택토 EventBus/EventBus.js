import {reactive} from "vue";

// vue 3에서는 eventbus 지원 중단. 그래서 아래 강의와 코드가 매우 다름..........
// 강의: https://www.inflearn.com/course/lecture?courseSlug=web-game-vue&unitId=23194&category=questionDetail
// 코드 참고: https://vuejs.org/guide/scaling-up/state-management.html
export const store = reactive({
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  turn: "O",
  winner: null,
  initData(winner) {
    this.tableData = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    if (winner) {
      this.turn = winner;
    } else {
      this.changeTurn();
    }

    this.winner = winner;

    setTimeout(() => {
      this.winner = null;
    }, 2000);
  },
  changeTurn() {
    const turning = {
      "O": "X",
      "X": "O",
    };

    this.turn = turning[this.turn];
  },
  onClickTd(cellData, rowIndex, cellIndex) {
    if (cellData) { // 이미 눌러진 칸일 때
      return;
    }

    this.tableData[rowIndex][cellIndex] = this.turn;

    if (this.checkWin(rowIndex, cellIndex)) {  // 이긴 경우 (3줄 달성)
      this.initData(this.turn);
      return;
    }

    let allCheck = true;

    this.tableData.forEach(row => {
      if (row.includes("")) {
        allCheck = false;
      }
    });

    if (allCheck) { // 무승부
      this.initData(null);
    } else {
      this.changeTurn();
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
  }
});