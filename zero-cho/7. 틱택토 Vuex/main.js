import {createApp} from 'vue'
import TicTacToe from "./TicTacToe";
import store from "./store";

const app = createApp(TicTacToe);

// use를 먼저 해주고 mount를 해야됨 ㅠㅠ
app.use(store);  // store 사용 시 vue와 vuex 연결이 필요함, middleware 추가
/*
  원래는 store.js에서 Vue.use(Vuex) 해줬었는데
  vue 버전이 변경되고(2->3), createApp을 통해 vue를 먼저 생성할 수 있게 되어서
  최상위 js에 store를 한번만 연결해주면 됨
*/


app.mount("#root");