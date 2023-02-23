import {createApp} from 'vue'
import MineSweeper from "./MineSweeper";
import store from "./store";

const app = createApp(MineSweeper);

app.use(store);

app.mount("#root");