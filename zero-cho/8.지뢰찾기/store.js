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
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
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
    },
    [OPEN_CELL](state) {
    },
    [CLICK_MINE](state) {
    },
    [FLAG_CELL](state) {
    },
    [QUESTION_CELL](state) {
    },
    [NORMALIZE_CELL](state) {
    },
    [INCREMENT_TIMER](state) {
    },
  },
  actions: {  // 비동기를 사용할 때 || 여러 mutations를 연달아 실행할 때

  },
});

export default store;