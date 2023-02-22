// vuex 4.x 버전 참고: https://vuex.vuejs.org/guide/
import {createStore} from 'vuex'

// export 붙여서 모듈화
export const SET_WINNER = "SET_WINNER";  // ES2015 - object dynamic property 문법
export const CLICK_CELL = "CLICK_CELL"; // export const => import {CLICK_CELL} from "./store" 중괄호에 넣어줘야함, 이름이 const에 명시한 이름과 동일해야함
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";
export const NO_WINNER = "NO_WINNER";

const store = createStore({ // import 시 변수 명 임시 설정 가능
  state() {  // vue의 data 속성과 비슷
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      turn: "O",
      winner: null,
    }
  },
  getters: {  // vue의 computed와 비슷

  },
  mutations: {  // state를 동기적으로 수정할 때 사용. state 수정시 mutations를 거쳐서 수정하는 것을 권장한다..
    // 데이터 수정 시 기록이 남아서 데이터 변경 추적이 용이함
    [SET_WINNER](state, winner) { // 함수 명 대문자로 적는 것을 권장
      state.winner = winner;
    },
    [CLICK_CELL](state, {row, cell}) {
      state.tableData[row][cell] = state.turn;
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === "O" ? "X" : "O";
    },
    [RESET_GAME](state) {
      state.turn = "O";
      state.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
    },
    [NO_WINNER](state) {
      state.winner = null;
    }
  },
  actions: {  // 비동기를 사용할 때 || 여러 mutations를 연달아 실행할 때

  },
});

export default store;