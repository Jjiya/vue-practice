// vuex 4.x 버전 참고: https://vuex.vuejs.org/guide/
import {createStore} from 'vuex';

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

// 숫자 코드로 현재 배열의 상태를 표시함
export const CODE = {
  OPENED: 0,  // 0이상이면 다 OPENED
  NORMAL: -1, // 빈칸
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,  // 지뢰에 ? 를 설치한 경우 ? 제거 시 다시 지뢰로 돌려주기 위함
  FLAG_MINE: -5,  // 지뢰에 깃발을 설치한 경우 깃발 제거 시 다시 지뢰로 돌려주기 위함
  CLICKED_MINE: -6,
  MINE: -7, // 지뢰
};

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell).fill().map((arr, i) => i);
  const shuffle = [];

  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];

  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }

  for (let i = 0; i < shuffle.length; i++) {
    const vertical = Math.floor(shuffle[i] / cell);
    const horizon = shuffle[i] % cell;

    data[vertical][horizon] = CODE.MINE;
  }

  return data;
};

const store = createStore({ // import 시 변수 명 임시 설정 가능
  state() {  // vue의 data 속성과 비슷
    return {
      tableData: [],
      mineData: {
        row: 0,
        cell: 0,
        mine: 0
      },
      timer: 0,
      halted: true, // 게임 중단 상태
    }
  },
  getters: {  // vue의 computed와 비슷 (cashing 가능)
    resultMessage(state) {
      return `${state.timer}초 만에 모든 지뢰를 찾았습니다.`;
    }
  },
  mutations: {  // state를 동기적으로 수정할 때 사용. state 수정시 mutations를 거쳐서 수정하는 것을 권장한다..
    [START_GAME](state, {row, cell, mine}) {
      state.mineData = {
        row, cell, mine
      };
      /*
        state.mineData.row = row;
        앞전에 배열의 index를 이용한 data 변경 시
        화면이 랜더링되지 않는 이유에 대해 설명한 것처럼
        위와 같은 방법으로 객체의 key값이나 index를 이용해 data를 변경할 경우
        화면이 랜더링되지 않을 수 있다.
        그런 경우 또다시 Vue.set(state.data, "row", row); 와 같은 방법으로 값을 변경해주어야한다.
       */

      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.halted = false;
    },
    [OPEN_CELL](state, {row, cell}) {
      function checkAroundMine() {
        //  동 동남 남 남서 서 서북 북 북동 순서 탐색
        const aroundDirection = {
          rowDirection: [0, 1, 1, 1, 0, -1, -1, -1],
          cellDirection: [1, 1, 0, -1, -1, -1, 0, 1],
        }

        let mineCount = 0;

        for (let i = 0; i < aroundDirection.rowDirection.length; i++) {
          let nextRow = row + aroundDirection.rowDirection[i];
          let nextCell = cell + aroundDirection.cellDirection[i];

          if (!(0 <= nextRow && nextRow <= state.mineData.row) ||
            !(0 <= nextCell && nextCell <= state.mineData.cell)) {
            continue;
          }

          switch (state.tableData[nextRow][nextCell]) {
            case CODE.QUESTION_MINE:
            case CODE.FLAG_MINE:
            case CODE.MINE:
              mineCount++;
          }
        }

        return mineCount;
      }

      const aroundMineCount = checkAroundMine();

      if (aroundMineCount === 0) {
        state.tableData[row][cell] = CODE.OPENED;
      } else {
        state.tableData[row][cell] = aroundMineCount;
      }
    },
    [CLICK_MINE](state, {row, cell}) {
      state.tableData[row][cell] = CODE.CLICKED_MINE;
      state.halted = true;
    },
    [FLAG_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.MINE || state.tableData[row][cell] === CODE.QUESTION_MINE) {
        state.tableData[row][cell] = CODE.FLAG_MINE;
      } else {
        state.tableData[row][cell] = CODE.FLAG;
      }
    },
    [QUESTION_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.MINE || state.tableData[row][cell] === CODE.FLAG_MINE) {
        state.tableData[row][cell] = CODE.QUESTION_MINE;
      } else {
        state.tableData[row][cell] = CODE.QUESTION;
      }
    },
    [NORMALIZE_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE || state.tableData[row][cell] === CODE.FLAG_MINE) {
        state.tableData[row][cell] = CODE.MINE;
      } else {
        state.tableData[row][cell] = CODE.NORMAL;
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer++;
    },
  },
  actions: {  // 비동기를 사용할 때 || 여러 mutations를 연달아 실행할 때

  },
});

export default store;