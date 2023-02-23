// vuex 4.x 버전 참고: https://vuex.vuejs.org/guide/
import {createStore} from 'vuex';

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

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