import {createApp} from 'vue'
import TicTacToe from "./TicTacToe";
import store from "./store";

const app = createApp(TicTacToe);

// use를 먼저 해주고 mount를 해야됨 ㅠㅠ
app.use(store);  // store 사용 시 vue와 vuex 연결이 필요함

app.mount("#root");