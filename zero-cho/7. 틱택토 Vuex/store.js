import Vuex from "vuex";

export default new Vuex.Store({
  state: {},  // vue의 data 속성과 비슷
  getters: {},  // vue의 computed와 비슷
  mutations: {},  // state를 동기적으로 수정할 때 사용. state 수정시 mutations를 거쳐서 수정하는 것을 권장한다..
  actions: {},  // 비동기를 사용할 때 || 여러 mutations를 연달아 실행할 때
});